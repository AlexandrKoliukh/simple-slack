import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { filter } from 'lodash';
import { Media } from 'react-bootstrap';
import moment from 'moment';

function Messages() {
  const { messages, currentChannelId } = useSelector((state) => ({
    messages: state.messages.data,
    currentChannelId: state.channels.currentChannelId,
  }));

  const messagesForCurrentChannel = filter(messages, { channelId: currentChannelId });
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  moment.locale(window.navigator.language);

  return (
    <div className="d-flex flex-column p-2 overflow-auto mb-3">
      {
        messagesForCurrentChannel.map((m) => {
          const {
            text, id, username, date,
          } = m;
          const formattedDate = moment(date).calendar();

          return (
            <Media key={`message-${id}`}>
              <Media.Body>
                <span className="mr-2">{username}</span>
                <span style={{ color: 'silver' }}>{formattedDate}</span>
                <p>
                  {text}
                </p>
              </Media.Body>
            </Media>
          );
        })
      }
      <div ref={lastMessageRef} />
    </div>
  );
}

export default Messages;
