import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalState: {
    show: false,
    type: null,
    data: {},
  },
};

const modal = createSlice({
  name: 'ui/modal',
  initialState,
  reducers: {
    hideModal: () => initialState,
    showModal: (state, action) => {
      const { type, data = {} } = action.payload;
      state.modalState.show = true;
      state.modalState.type = type;
      state.modalState.data = data;
    },
  },
});

const { actions, reducer } = modal;

export const {
  hideModal, showModal,
} = actions;

export default reducer;
