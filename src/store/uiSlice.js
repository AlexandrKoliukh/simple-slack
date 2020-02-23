import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalState: {
    isOpen: false,
    type: 'default',
    error: null,
    data: {},
  },
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeModalState(state, action) {
      const { ...modalState } = action.payload;
      state.modalState = {
        ...state.modalState,
        ...modalState,
      };
    },
    close() {
      return initialState;
    },
  },
});

const { actions, reducer } = ui;

export const {
  changeModalState, close,
} = actions;

export default reducer;
