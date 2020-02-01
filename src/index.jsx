// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { UserNameContext } from './components/ReactComponents';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels, messages } = window.gon;


if (Cookies.get('userName') === undefined) {
  const userName = faker.internet.userName();
  Cookies.set('userName', userName, { expires: 1 });
}

const currentUserName = Cookies.get('userName');

ReactDOM.render(
  <UserNameContext.Provider value={currentUserName}>
    <App channels={channels} messages={messages} />
  </UserNameContext.Provider>,
  document.getElementById('chat'),
);
