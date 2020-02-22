import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as channelsActions from '../store/channelsSlice';

function Channels(props) {
  const {
    changeActiveChannel, currentChannelId, channels,
  } = props;

  const handleClick = (id) => (e) => {
    e.preventDefault();
    changeActiveChannel({ id });
  };

  const getClasses = (id) => cn({
    'nav-link': true,
    active: currentChannelId === id,
  });

  return (
    <div className="row">
      <ul className="nav nav-pills flex-column">
        {channels.map((channel) => {
          const { name, id } = channel;
          return (
            // eslint-disable-next-line max-len
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              className="nav-item flex-column p-1"
              key={id}
              onClick={handleClick(id)}
            >
              <span className={getClasses(id)}>
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentChannelId: state.channels.currentChannelId,
  channels: state.channels.data,
});

const actionCreators = {
  ...channelsActions,
};

export default connect(mapStateToProps, actionCreators)(Channels);
