import React from 'react';

const App = (props) => {
  const { channels } = props;

  return (
    <div>
      <ul>
        {channels.map((channel) => {
          const { id, name } = channel;
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
