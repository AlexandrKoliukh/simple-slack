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
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import UsernameContext from './common/UserameContext';
import reducer from './store';
import { addMessage } from './store/messagesSlice';
import { addChannel, removeChannelHandler } from './store/channelsSlice';
import { socketEvents } from './common/constants';

const isProductionMode = process.env.NODE_ENV !== 'production';
if (isProductionMode) {
  localStorage.debug = 'chat:*';
}

const { channels, messages, currentChannelId } = window.gon;

const store = configureStore({
  devTools: !isProductionMode,
  reducer,
  preloadedState: {
    messages: {
      data: messages,
      error: null,
    },
    channels: {
      data: channels,
      error: null,
      currentChannelId,
    },
  },
});

io()
  .on(socketEvents.newMessage, ({ data }) => {
    store.dispatch(addMessage({ newMessage: data.attributes }));
  })
  .on(socketEvents.newChannel, ({ data }) => {
    store.dispatch(addChannel({ newChannel: data.attributes }));
  })
  .on(socketEvents.removeChannel, ({ data }) => {
    store.dispatch(removeChannelHandler({ id: data.id }));
  });

let userName = Cookies.get('userName');
if (userName === undefined) {
  userName = faker.internet.userName();
  Cookies.set('userName', userName, { expires: 1 });
}

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={userName}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
