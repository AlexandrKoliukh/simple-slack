import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import * as service from '../service';

const initialState = {
  data: [],
  error: null,
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, action) {
      const { newChannel } = action.payload;
      state.data.push(newChannel);
    },
    removeChannelHandler(state, action) {
      const { id } = action.payload;
      remove(state.data, (i) => i.id === id);
    },
    changeCurrentChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    channelsError(state, action) {
      const { error } = action.payload;
      state.error = error;
    },
  },
});

const { actions, reducer } = channels;

export const {
  addChannel, changeCurrentChannel, removeChannelHandler, channelsError,
} = actions;

export const createChannel = (name) => (dispatch) => {
  service.createChannel(name)
    .catch((error) => {
      dispatch(channelsError({ error }));
    });
};

export const removeChannel = (id) => (dispatch) => {
  service.deleteChannel(id)
    .catch((error) => {
      dispatch(channelsError({ error }));
    });
};

export default reducer;
