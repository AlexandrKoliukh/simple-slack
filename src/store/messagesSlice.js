import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import * as channelsActions from './channelsSlice';

const initialState = {
  data: [],
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      const { newMessage } = action.payload;
      state.data.push(newMessage);
    },
  },
  extraReducers: {
    [channelsActions.removeChannel](state, action) {
      const { id } = action.payload;
      remove(state.data, (m) => m.channelId === id);
    },
  },
});

const { actions, reducer } = messages;

export const {
  addMessage,
} = actions;

export default reducer;
