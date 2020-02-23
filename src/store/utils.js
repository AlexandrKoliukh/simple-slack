import { processStates } from '../common/constants';

export const fetchingHandler = (state) => {
  state.fetchingState = processStates.fetching;
};
export const fetchedHandler = (state) => {
  state.fetchingState = processStates.fetched;
  state.error = null;
};
export const fetchingFailedHandler = (state, action) => {
  const { error } = action.payload;
  state.fetchingState = processStates.failed;
  state.error = error;
};
