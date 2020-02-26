import { createSlice } from '@reduxjs/toolkit';
import { remove, findIndex } from 'lodash';

const initialState = {
  data: [],
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, action) {
      const { newChannel } = action.payload;
      state.data.push(newChannel);
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      remove(state.data, (i) => i.id === id);
    },
    changeCurrentChannel(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const index = findIndex(state.data, { id });
      const channel = state.data[index];
      state.data[index] = {
        ...channel,
        name,
      };
    },
  },
});

const { actions, reducer } = channels;

export const {
  addChannel, changeCurrentChannel, removeChannel, renameChannel,
} = actions;

export default reducer;
