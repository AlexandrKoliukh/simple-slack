import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import * as service from '../service';
import * as channelsActions from './channelsSlice';

const initialState = {
  postingState: 'none',
  data: [],
  error: null,
};

const start = (state) => {
  state.postingState = 'posting';
  state.error = null;
};

const failed = (state, action) => {
  const { error } = action.payload;
  state.postingState = 'failed';
  state.error = error;
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    postMessageStart: start,
    postMessageSuccess(state) {
      state.postingState = 'posted';
    },
    postMessageFailure: failed,
    addMessage(state, action) {
      const { newMessage } = action.payload;
      state.data.push(newMessage);
    },
  },
  extraReducers: {
    [channelsActions.removeChannelHandler](state, action) {
      const { id } = action.payload;
      remove(state.data, (m) => m.channelId === id);
    },
  },
});

const { actions, reducer } = messages;

export const {
  postMessageStart, postMessageSuccess, postMessageFailure, addMessage,
} = actions;

export const postMessage = (channelId, attributes) => (dispatch) => {
  dispatch(postMessageStart());
  service.postMessage(channelId, attributes)
    .then(() => {
      dispatch(postMessageSuccess());
    })
    .catch((e) => {
      const error = { message: e.message };
      dispatch(postMessageFailure({ error }));
    });
};

export default reducer;
