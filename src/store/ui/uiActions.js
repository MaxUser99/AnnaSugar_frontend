import { staticTextUrl, getLangHeader } from '../api';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const openModal = (modalName, state = null) => ({type: OPEN_MODAL, payload: {modalName, state}});
export const changeLanguage = (lang) => ({ type: CHANGE_LANGUAGE, payload: lang });
export const loadStatic = () => {
  return async (dispatch, getState, api) => {
    const { ui: { language } } = getState();
    const url = staticTextUrl();
    const headers = getLangHeader(language);
    const result = await api.get(url, { headers })
      .then(({ data: { data: { home } } }) => {
        console.log({ home });
        return home;
      })
      .catch(() => console.error('fetch error'));
    console.log({ result });
  }
}