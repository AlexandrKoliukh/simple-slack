import React from 'react';
import { useSelector } from 'react-redux';

function SideNavigation() {
  const channels = useSelector((state) => state.channels.data);

  return (
    <div className="row">
      <ul className="nav nav-pills flex-column">
        {channels.map((channel) => {
          const { name, id } = channel;
          return (
            <li className="nav-item flex-column p-1" key={id}>
              <span className="nav-link active">
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
