import { createSlice } from '@reduxjs/toolkit';
import * as service from '../service';

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

const start = (state) => {
  state.isLoading = true;
  state.error = null;
};

const failed = (state, action) => {
  const { error } = action.payload;
  state.isLoading = false;
  state.error = error;
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    postMessageStart: start,
    postMessageSuccess(state) {
      state.isLoading = false;
    },
    postMessageFailure: failed,
    addMessage(state, action) {
      const { newMessage } = action.payload;
      state.data.push(newMessage);
    },
  },
});

const { actions, reducer } = messages;

export const {
  postMessageStart, postMessageSuccess, postMessageFailure, addMessage,
} = actions;

export const postMessage = (channelId, text) => (dispatch) => {
  dispatch(postMessageStart());
  service.postMessage(channelId, text)
    .then(() => dispatch(postMessageSuccess()))
    .catch((e) => {
      const error = { message: e.message };
      dispatch(postMessageFailure({ error }));
    });
};

export default reducer;
