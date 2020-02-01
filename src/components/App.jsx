import React, { useContext } from 'react';
import SideNavigation from './SideNavigation';
import { UserNameContext } from './ReactComponents';

function App(props) {
  const { channels } = props;
  const userName = useContext(UserNameContext);

  return (
    <SideNavigation channels={channels} />
  );
}

export default App;
