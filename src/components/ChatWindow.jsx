import React from 'react';
import { useSelector } from 'react-redux';

function ChatWindow() {
  const { messages } = useSelector((state) => {
    const currentChannelId = state.channels.activeChannelId;
    return {
      messages: state.messages.data.filter((m) => m.channelId === currentChannelId),
      activeChannelId: currentChannelId,
    };
  });

  return (
    <div className="col fields">
      {
        messages.map((m) => {
          const {
            text, id, username, date,
          } = m;
          return (
            <div className="border rounded row mt-2 p-2" key={id}>
              <span>{username}</span>
              <span>{date}</span>
              <div style={{ color: 'red' }}>{text}</div>
            </div>
          );
        })
      }
    </div>
  );
}

export default ChatWindow;
