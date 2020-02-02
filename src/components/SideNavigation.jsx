import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { changeActiveChannel } from '../store/channelsSlice';

function SideNavigation() {
  const { channels, activeChannelId } = useSelector(({ channels: ch }) => ({
    channels: ch.data,
    activeChannelId: ch.activeChannelId,
  }));
  const dispatch = useDispatch();

  const handleClick = (id) => (e) => {
    e.preventDefault();
    dispatch(changeActiveChannel({ id }));
  };

  const getClasses = (id) => cn({
    'nav-link': true,
    active: activeChannelId === id,
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

export default SideNavigation;
