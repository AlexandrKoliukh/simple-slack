import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  activeChannelId: 1,
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, action) {
      const { newChannel } = action.payload;
      state.data.push(newChannel);
    },
    // removeChannel(state, action) {
    //   console.log(action);
    // },
    changeActiveChannel(state, action) {
      const { id } = action.payload;
      state.activeChannelId = id;
    },
  },
});

const { actions, reducer } = channels;

export const { addChannel, changeActiveChannel, removeChannel } = actions;

export default reducer;
