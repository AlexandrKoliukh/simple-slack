import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Media } from 'react-bootstrap';
import moment from 'moment';
import * as messagesActions from '../../store/messagesSlice';

function Messages(props) {
  const { messages, currentChannelId } = props;
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


const mapStateToProps = (state) => ({
  messages: state.messages.data,
  currentChannelId: state.channels.currentChannelId,
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Messages);
