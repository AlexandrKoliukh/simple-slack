// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './i18next';
import '../assets/application.scss';

import faker from 'faker';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import { UserNameContext } from './components/ReactContext';
import reducer from './store';
import { addMessage } from './store/messagesSlice';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels, messages } = window.gon;

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer,
  middleware: [...getDefaultMiddleware()],
  preloadedState: {
    messages: {
      data: messages,
    },
    channels: {
      data: channels,
    },
  },
});

io().on('newMessage', ({ data }) => {
  store.dispatch(addMessage({ newMessage: data.attributes }));
});

if (Cookies.get('userName') === undefined) {
  const userName = faker.internet.userName();
  Cookies.set('userName', userName, { expires: 1 });
}
const currentUserName = Cookies.get('userName');

ReactDOM.render(
  <Provider store={store}>
    <UserNameContext.Provider value={currentUserName}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
