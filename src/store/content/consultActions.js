import mockTaroConsult from '../mocks/mockTaroConsult.json';
import mockAstroConsult from '../mocks/mockAstroConsult.json';
import mockRuneConsult from '../mocks/mockRuneConsult.json';
import mockRitualConsult from '../mocks/mockRitualConsult.json';

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

export const PUSH_ASTRO = 'PUSH_ASTRO';
export const PUSH_TARO = 'PUSH_TARO';
export const PUSH_RUNE = 'PUSH_RUNE';
export const PUSH_RITUAL = 'PUSH_RITUAL';

export const SET_REVIEW_ASTRO = 'SET_REVIEW_ASTRO';
export const SET_REVIEW_TARO = 'SET_REVIEW_TARO';
export const SET_REVIEW_RUNE = 'SET_REVIEW_RUNE';
export const SET_REVIEW_RITUAL = 'SET_REVIEW_RITUAL';

export const setReviewAstro = (item) => ({ type: SET_REVIEW_ASTRO, payload: item });
export const setReviewTaro = (item) => ({ type: SET_REVIEW_TARO, payload: item });
export const setReviewRune = (item) => ({ type: SET_REVIEW_RUNE, payload: item });
export const setReviewRitual = (item) => ({ type: SET_REVIEW_RITUAL, payload: item });

export const setAstroLoading = () => ({ type: SET_ASTRO_LOADING });
export const setTaroLoading = () => ({ type: SET_TARO_LOADING });
export const setRuneLoading = () => ({ type: SET_RUNE_LOADING });
export const setRitualLoading = () => ({ type: SET_RITUAL_LOADING });

export const pushAstro = data => ({ type: PUSH_ASTRO, payload: data });
export const pushTaro = data => ({ type: PUSH_TARO, payload: data });
export const pushRune = data => ({ type: PUSH_RUNE, payload: data });
export const pushRitual = data => ({ type: PUSH_RITUAL, payload: data });

export const loadAstro = () => loader(DATA_TYPE.ASTRO);
export const loadTaro = () => loader(DATA_TYPE.TARO);
export const loadRune = () => loader(DATA_TYPE.RUNE);
export const loadRitual = () => loader(DATA_TYPE.RITUAL);

function loader(contentType) {
  let setLoading;
  let pushItems;
  let data;

  switch (contentType) {
    case DATA_TYPE.ASTRO:
      setLoading = setAstroLoading;
      pushItems = pushAstro;
      data = mockAstroConsult;
      break;
    case DATA_TYPE.TARO:
      setLoading = setTaroLoading;
      pushItems = pushTaro;
      data = mockTaroConsult;
      break;
    case DATA_TYPE.RUNE:
      setLoading = setRuneLoading;
      pushItems = pushRune;
      data = mockRuneConsult;
      break;
    case DATA_TYPE.RITUAL:
      setLoading = setRitualLoading;
      pushItems = pushRitual;
      data = mockRitualConsult;
      break;
  }

  return async function (dispatch) {
    dispatch(setLoading());

    return delay(400).then(() => dispatch(pushItems(data)));
  }
}

// test
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}