import { OPEN_MODAL, CHANGE_LANGUAGE } from './uiActions';
import LANGS from '../../constants/langs';

const initialState = {
  openedModal: null,
  state: null,
  language: LANGS.RU
};

export default (state = initialState, action) => {
  console.log('ui: ', action);
  switch (action.type) {
    case OPEN_MODAL: return {
      ...state,
      openedModal: action.payload.modalName,
      state: action.payload.state
    };
    case CHANGE_LANGUAGE: return {
      ...state,
      language: action.payload
    };
    default: return state;
  }
};
