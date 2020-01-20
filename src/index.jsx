// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels, messages } = window.gon;

ReactDOM.render(<App channels={channels} messages={messages} />, document.getElementById('chat'));
