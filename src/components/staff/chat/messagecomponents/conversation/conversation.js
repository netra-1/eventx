import React from 'react'
import "./conversation.css";

export default function ChatUserItem({ userItem }) {

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={userItem.image.url}
        alt="PP"
      />
      <span className="conversationName text-lg">{userItem.profile.fullName}</span>
    </div>
  );
}
