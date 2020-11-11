import { consultsUrl, getLangHeader } from '../api';

const DATA_TYPE = {
  ASTRO: 'ASTRO',
  TARO: 'TARO',
  RUNE: 'RUNE',
  RITUAL: 'RITUAL',
};

export const SET_ASTRO_LOADING = 'SET_ASTRO_LOADING';
export const SET_TARO_LOADING = 'SET_TARO_LOADING';
export const SET_RUNE_LOADING = 'SET_RUNE_LOADING';
export const SET_RITUAL_LOADING = 'SET_RITUAL_LOADING';

export const SET_ASTRO = 'SET_ASTRO';
export const SET_TARO = 'SET_TARO';
export const SET_RUNE = 'SET_RUNE';
export const SET_RITUAL = 'SET_RITUAL';

export const setAstroLoading = () => ({ type: SET_ASTRO_LOADING });
export const setTaroLoading = () => ({ type: SET_TARO_LOADING });
export const setRuneLoading = () => ({ type: SET_RUNE_LOADING });
export const setRitualLoading = () => ({ type: SET_RITUAL_LOADING });

export const setAstro = data => ({ type: SET_ASTRO, payload: data });
export const setTaro = data => ({ type: SET_TARO, payload: data });
export const setRune = data => ({ type: SET_RUNE, payload: data });
export const setRitual = data => ({ type: SET_RITUAL, payload: data });

export const loadAstro = () => loader(DATA_TYPE.ASTRO);
export const loadTaro = () => loader(DATA_TYPE.TARO);
export const loadRune = () => loader(DATA_TYPE.RUNE);
export const loadRitual = () => loader(DATA_TYPE.RITUAL);

const typeIds = {
  [DATA_TYPE.ASTRO]: 1,
  [DATA_TYPE.TARO]: 2,
  [DATA_TYPE.RUNE]: 3,
  [DATA_TYPE.RITUAL]: 4,
}
const loaderSettings = {
  [DATA_TYPE.ASTRO]: { setLoading: setAstroLoading, setItems: setAstro, url: consultsUrl(typeIds[DATA_TYPE.ASTRO])},
  [DATA_TYPE.TARO]: { setLoading: setTaroLoading, setItems: setTaro, url: consultsUrl(typeIds[DATA_TYPE.TARO])},
  [DATA_TYPE.RUNE]: { setLoading: setRuneLoading, setItems: setRune, url: consultsUrl(typeIds[DATA_TYPE.RUNE])},
  [DATA_TYPE.RITUAL]: { setLoading: setRitualLoading, setItems: setRitual, url: consultsUrl(typeIds[DATA_TYPE.RITUAL])},
}

function loader(contentType) {
  return async function (dispatch, getState, api) {
    const { ui: { language }} = getState();
    const { setItems, url, setLoading } = loaderSettings[contentType];
    dispatch(setLoading());
    const headers = getLangHeader(language);
    const items = await api.get(url, { headers })
      .then(({ data: { data }}) => data)
      .catch(() => []);
    return dispatch(setItems(items));
  }
}
