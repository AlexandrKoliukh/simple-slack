import { createSlice } from '@reduxjs/toolkit';

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
      console.log(action);
    },
  },
});

const { actions, reducer } = channels;

export const { addChannel } = actions;

export default reducer;
