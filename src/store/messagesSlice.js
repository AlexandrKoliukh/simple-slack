import { createSlice } from '@reduxjs/toolkit';

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
});

const { actions, reducer } = messages;

export const { addMessage } = actions;

export default reducer;
