import React, { useContext } from 'react';
import SideNavigation from './SideNavigation';
import UsernameContext from '../common/UserameContext';
import MessageForm from './MessageForm';
import ChatWindow from './ChatWindow';

function App(props) {
  const { channels, messages } = props;
  const userName = useContext(UsernameContext);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <SideNavigation channels={channels} />
        </div>
        <div className="col-10">
          <ChatWindow messages={messages} userName={userName} />
        </div>
        <div className="col-11">
          <MessageForm />
        </div>
      </div>
    </div>
  );
}

export default App;
