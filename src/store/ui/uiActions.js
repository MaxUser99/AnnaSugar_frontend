import { staticTextUrl, getLangHeader } from '../api';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const SET_TEXT = 'SET_TEXT';

export const openModal = (modalName, state = null) => ({type: OPEN_MODAL, payload: { modalName, state }});
export const changeLanguage = (lang) => ({ type: CHANGE_LANGUAGE, payload: lang });
export const setText = (texts) => ({ type: SET_TEXT, payload: texts });

export const loadStatic = () => {
  return async (dispatch, getState, api) => {
    const { ui: { language } } = getState();
    const url = staticTextUrl();
    const headers = getLangHeader(language);
    const payload = await api.get(url, { headers })
      .then(({ data: { data: { home: { intro_pt1, intro_pt2 } } } }) => {
        console.log({ intro_pt1, intro_pt2 });
        return {
          text1: intro_pt1 || null,
          text2: intro_pt2 || null,
        };
      })
      .catch(() => {
        console.error('fetch error');
        return {
          text1: null,
          text2: null
        };
      });

    dispatch(setText(payload));
  }
}
