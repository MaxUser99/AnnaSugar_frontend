export const OPEN_MODAL = 'OPEN_MODAL';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const openModal = (modalName, state = null) => ({type: OPEN_MODAL, payload: {modalName, state}});
export const changeLanguage = (lang) => ({ type: CHANGE_LANGUAGE, payload: lang });
