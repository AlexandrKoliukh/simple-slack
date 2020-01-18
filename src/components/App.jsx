import React from 'react';
import {
  List, ListItem, ListItemText
} from '@material-ui/core';

const App = (props) => {
  const { channels } = props;

  return (
    <List component="nav" disablePadding>
      {channels.map((channel) => {
        const { id, name } = channel;
        return (
          <ListItem key={id}>
            <ListItemText primary={name}/>
          </ListItem>
        );
      })}
    </List>
  );
};

export default App;
