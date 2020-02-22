import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import * as service from '../service';

const initialState = {
  data: [],
  currentChannelId: 1,
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
    changeActiveChannel(state, action) {
      const { id } = action.payload;
      state.activeChannelId = id;
    },
  },
});

const { actions, reducer } = channels;

export const { addChannel, changeActiveChannel, removeChannelHandler } = actions;

export const removeChannel = (id) => (dispatch) => {
  dispatch(removeChannelHandler({ id }));
  service.deleteChannel(id);
};

export default reducer;
