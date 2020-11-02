import { LOG_IN } from './actions';

const initialState = {
  user: {}
  // user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: return state;
    default: return state;
  }
};