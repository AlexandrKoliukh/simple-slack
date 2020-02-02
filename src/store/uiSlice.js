import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: 1,
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeActiveChannel(state, action) {
      const { id } = action.payload;
      state.activeChannel = id;
    },
  },
});

const { actions, reducer } = ui;

export const { changeActiveChannel } = actions;

export default reducer;
