import React from 'react';
import { useSelector } from 'react-redux';

function ChatWindow() {
  const messages = useSelector((state) => state.messages.data);

  return (
    <div className="col">
      {
        messages.map((m) => {
          const { text, id } = m;
          return <span className="border rounded row mt-2 p-2" key={id}>{text}</span>;
        })
      }
    </div>
  );
}

export default ChatWindow;
