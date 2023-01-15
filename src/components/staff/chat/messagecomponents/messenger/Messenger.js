import React from 'react'
import { useEffect, useRef } from "react";
import { useState } from "react";
import ChatUserItem from "../conversation/conversation";
import Message from "../Message/Message";
import { MdSend } from "react-icons/md";
import "./messenger.scss";
import axios from "axios";
import { io } from "socket.io-client";
// import no_conversation from "../../assets/no_conversation.svg";
import { BiSearch } from "react-icons/bi";

const Messenger = () => {
  const [userList, setUserList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [allConversations, setAllConversations] = useState([]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  const config = {
    headers : {
        Authorization : localStorage.getItem('token'),
    }
  }

  const socket = useRef();
  const user = localStorage.getItem("staff_id");

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8011");
  //   socket.current.on('connect', () => {console.log('CONNECTED');})
  //   socket.current.on("msg-receive", (data) => {
  //     console.log('msg-receive: ', data);
  //     setArrivalMessage({
  //       sender: data.senderusername,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  //   console.log(currentChat);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("add-user", user);
  //   socket.current.on("getUsers", (users) => {
  //     console.log(users);
  //   });
  // }, [user]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:8000/admin/user/chat-contact`,config
      );

      if(res.data.success){
        setUserList(res.data.data.chatUserList)
      }
    })()
    socket.current = io("ws://localhost:8011");
    socket.current.on('connect', () => {console.log('CONNECTED');})
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      const message = {
        message: newMessage,
        to: currentChat._id,
      };
      try {
        const res = await axios.post(
          "http://localhost:8000/api/chat",
          message,
          config
        );
        setMessages(prevState => ([...prevState, res.data.data]));
        setNewMessage("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const searchConversation = (searchQuery) => {
    const searchResult = allConversations.filter(
      (c) =>
        c.members[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.members[1].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUserList(searchResult);

    if (searchQuery === "") {
      setUserList(allConversations);
    }
  };

  const handleUserItemClick = (userItem) => async (e) => {
    e.preventDefault()
    setCurrentChat(userItem)
      const res = await axios.get(
        `http://localhost:8000/admin/chat/?to=${userItem._id}`,config
      );

      if(res.data.success){
        setMessages(res.data.data)
      }
  }

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <p className="conversation-heading"> Conversations</p>

          <div className="chatmenuWrapper">
            <div className="search-conversation">
              <input
                className="search-conversation__input"
                placeholder="username"
                onChange={(e) => searchConversation(e.target.value)}
              />
              <BiSearch className="search-conversation__icon" />
            </div>
            {userList.map((userItem) => (
              <div
                key={userItem._id}
                onClick={handleUserItemClick(userItem)}
                data-test="sender-btn"
                className={`${
                  currentChat === userItem && "conversation-users__active"
                } conversation-users`}
              >
                <ChatUserItem userItem={userItem} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
              <div>
                {currentChat.profile.fullName}
              </div>
                <div className="chatBoxTop" style={{minHeight: '500px'}}>
                  {messages.map((msg) => (
                    <div ref={scrollRef}>
                      <Message
                        message={msg}
                        currentChat={currentChat}
                      />
                    </div>
                  ))}
                </div>

                <div class="chat-message clearfix">
                  <form className="chat__form" onSubmit={handleSubmit}>
                    <input
                      className="chat__input"
                      name="message-to-send"
                      id="message-to-send"
                      placeholder="Enter your message"
                      rows="3"
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                      }}
                      value={newMessage}
                      data-test="text"
                    />{" "}
                    <button
                      className="chat__btn"
                      type="submit"
                      data-test="send-btn"
                    >
                      Send message <MdSend />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <span className="no-conversation">
                <img
                  src={"https://static.vecteezy.com/system/resources/previews/005/266/444/original/no-messages-or-notifications-yet-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"}
                  alt="no_conversation"
                  className="no-conversation__img"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Messenger;