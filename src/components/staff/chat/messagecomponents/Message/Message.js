import React from 'react'
import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, currentChat }) {
  return (
    <>
      {message.senderSelf ? (
        <div className="message own">
          <div className="messageTop">
            <p className="messageText">{message.message}</p>
          </div>
          <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
      ) : (
        <div className="message">
          <div className="messageTop">
            <img
              className="messageImg"
              src={currentChat.image.url}
              alt=""
            />
            <p className="messageText">{message.message}</p>
          </div>
          <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
      )}
    </>
  );
}
