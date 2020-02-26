import React from 'react';
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

  moment.locale(window.navigator.language);

  return (
    <div className="col fields">
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
    </div>
  );
}

export default Messages;
