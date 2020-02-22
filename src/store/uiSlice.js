import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalState: {
    isOpen: false,
    type: 'default',
    error: null,
  },
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeModalState(state, action) {
      const { modalState } = action.payload;
      state.modalState = modalState;
    },
  },
});

const { actions, reducer } = ui;

export const {
  changeModalState,
} = actions;

export default reducer;
