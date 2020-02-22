import React from 'react';
import { connect } from 'react-redux';
import * as messagesActions from '../store/messagesSlice';

function Messages(props) {
  const { messages } = props;

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


const mapStateToProps = (state) => ({
  messages: state.messages.data,
  postingState: state.messages.postingState,
});

const actionCreators = {
  ...messagesActions,
};

export default connect(mapStateToProps, actionCreators)(Messages);
