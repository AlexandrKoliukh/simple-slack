import React from 'react';

function SideNavigation(props) {
  const { channels } = props;

  return (
    <ul>
      {channels.map((channel) => {
        const { id, name } = channel;
        return (
          <li key={id}>
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default SideNavigation;
