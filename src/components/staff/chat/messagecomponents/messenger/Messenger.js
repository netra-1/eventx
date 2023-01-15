import React from 'react'
import { useEffect, useRef } from "react";
import { useState } from "react";
import ChatUserItem from "../conversation/conversation";
import Message from "../Message/Message";
import "./messenger.scss";
import axios from "axios";
import no_conversation from '../../../../../assets/img/no_conversation.png';
import {useSocket} from "../../../../../context/socket";

const Messenger = () => {
  const [userList, setUserList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [allConversations, setAllConversations] = useState([]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageReceivedUsers, setNewMessageReceivedUsers] = useState([])

  const scrollRef = useRef();

  const { sendMessage, receivedMessage } = useSocket()

  const config = {
    headers : {
        Authorization : localStorage.getItem('token'),
    }
  }

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:8000/admin/user/chat-contact`,config
      );

      if(res.data.success){
        setUserList(res.data.data.chatUserList)
        setAllConversations(res.data.data.chatUserList)
      }
    })()
  }, []);

  useEffect(() => {
    if(receivedMessage){
      if(currentChat?._id === receivedMessage.sender){
        setMessages(prevState => ([...prevState, receivedMessage]));
      }else{
        setNewMessageReceivedUsers(prevState => ([...prevState, receivedMessage.sender]))
      }
    }
  }, [receivedMessage])

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
        sendMessage(message.message, message.to)
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
        c.members.toLowerCase().includes(searchQuery.toLowerCase())
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
        if(newMessageReceivedUsers.includes(userItem._id)){
          setNewMessageReceivedUsers(prevState => (prevState.filter(user => user !== userItem._id)))
        }
      }
  }

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <p className="conversation-heading"> Conversations</p>

          <div className="chatmenuWrapper">
            {/* <div className="search-conversation">
              <input
                className="search-conversation__input"
                placeholder="name"
                onChange={(e) => searchConversation(e.target.value)}
              />
              <BiSearch className="search-conversation__icon" />
            </div> */}
            {userList.map((userItem) => {
              const hasNewMsg = newMessageReceivedUsers.includes(userItem._id)
              return (
                  <div
                      key={userItem._id}
                      onClick={handleUserItemClick(userItem)}
                      data-test="sender-btn"
                      className={`${
                          currentChat === userItem ? "conversation-users__active" : ''
                      } conversation-users ${hasNewMsg ? 'conversation-users__new-message' : ''}`}
                  >
                    {hasNewMsg && (
                        <span className={'new-message-count'}>{newMessageReceivedUsers.filter(user => user === userItem._id).length}</span>
                    )}
                    <ChatUserItem userItem={userItem} />
                  </div>
              )
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className='pb-2 flex'>
                  <img
                    className="conversationImg"
                    src={currentChat.image.url}
                    alt="PP"
                  />
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
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                      <input type="text" name='message-to-send'
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                      }}
                      value={newMessage} id="message-to-send" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your message" required />


                    {/* <input
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
                    /> */}
                    {" "}
                    <div>
                      <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      data-test="send-btn"
                    >
                      Send message
                    </button></div>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <span className="no-conversation">
                <img
                  src={no_conversation}
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