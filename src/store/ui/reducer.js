import { OPEN_MODAL, CHANGE_LANGUAGE, SET_TEXT } from './uiActions';
import LANGS from '../../constants/langs';

const initialState = {
  openedModal: null,
  state: null,
  texts: { text1: null, text2: null },
  language: LANGS.RU
};

export default (state = initialState, action) => {
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
    case SET_TEXT: return {
      ...state,
      texts: action.payload
    };
    default: return state;
  }
};
