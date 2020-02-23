import { createSlice } from '@reduxjs/toolkit';
import { remove, findIndex } from 'lodash';
import * as service from '../service';
import { processStates } from '../common/constants';
import { fetchingFailedHandler, fetchedHandler, fetchingHandler } from './utils';

const initialState = {
  fetchingState: processStates.none,
  data: [],
  error: null,
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchingFailed: fetchingFailedHandler,
    fetched: fetchedHandler,
    fetching: fetchingHandler,
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
  addChannel, changeCurrentChannel, removeChannelHandler,
  fetchingFailed, fetched, fetching, renameChannel,
} = actions;

export const createChannel = (name) => (dispatch) => {
  dispatch(fetching());
  return service.createChannel(name)
    .then(() => {
      dispatch(fetched());
    })
    .catch((error) => {
      dispatch(fetchingFailed({ error }));
    });
};

export const removeChannel = (id) => (dispatch) => {
  dispatch(fetching());
  return service.deleteChannel(id)
    .then(() => {
      dispatch(fetched());
    })
    .catch((error) => {
      dispatch(fetchingFailed({ error }));
    });
};

export const patchChannel = (id, name) => (dispatch) => {
  dispatch(fetching());
  return service.patchChannel(id, name)
    .then(() => {
      dispatch(fetched());
    })
    .catch((error) => {
      dispatch(fetchingFailed({ error }));
    });
};

export default reducer;
