import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import * as service from '../service';
import * as channelsActions from './channelsSlice';
import { processStates } from '../common/constants';
import { fetchedHandler, fetchingFailedHandler, fetchingHandler } from './utils';

const initialState = {
  fetchingState: processStates.none,
  data: [],
  error: null,
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    postMessageStart: fetchingHandler,
    postMessageSuccess: fetchedHandler,
    postMessageFailure: fetchingFailedHandler,
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
  return service.postMessage(channelId, attributes)
    .then(() => {
      dispatch(postMessageSuccess());
    })
    .catch((error) => {
      dispatch(postMessageFailure({ error }));
    });
};

export default reducer;
