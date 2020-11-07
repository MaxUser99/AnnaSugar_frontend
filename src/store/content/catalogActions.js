import { productsUrl, getLangHeader, productUrl } from '../api';
import { CATALOG_DATA_TYPE } from '../../constants/catalogDataType';

export const SET_BRACELETS_LOADING = 'SET_BRACELETS_LOADING';
export const SET_KINDLES_LOADING = 'SET_KINDLES_LOADING';
export const SET_BEADS_LOADING = 'SET_BEADS_LOADING';
export const SET_OTHERS_LOADING = 'SET_OTHERS_LOADING';

export const PUSH_BRACELETS = 'PUSH_BRACELETS';
export const PUSH_KINDLES = 'PUSH_KINDLES';
export const PUSH_BEADS = 'PUSH_BEADS';
export const PUSH_OTHERS = 'PUSH_OTHERS';

export const RESET_BRACELETS = 'RESET_BRACELETS';
export const RESET_KINDLES = 'RESET_KINDLES';
export const RESET_BEADS = 'RESET_BEADS';
export const RESET_OTHERS = 'RESET_OTHERS';

export const SET_REVIEW_BRACELET = 'SET_REVIEW_BRACELET';
export const SET_REVIEW_KINDLE = 'SET_REVIEW_KINDLE';
export const SET_REVIEW_BEAD = 'SET_REVIEW_BEAD';
export const SET_REVIEW_OTHER = 'SET_REVIEW_OTHER';

export const setBraceletsLoading = () => ({ type: SET_BRACELETS_LOADING }); 
export const setKindlesLoading = () => ({ type: SET_KINDLES_LOADING });
export const setBeadsLoading = () => ({ type: SET_BEADS_LOADING });
export const setOthersLoading = () => ({ type: SET_OTHERS_LOADING });

export const pushBracelets = (data, page) => ({ type: PUSH_BRACELETS, payload: { data, page }});
export const pushKindles = (data, page) => ({ type: PUSH_KINDLES, payload: { data, page }});
export const pushBeads = (data, page) => ({ type: PUSH_BEADS, payload: { data, page }});
export const pushOthers = (data, page) => ({ type: PUSH_OTHERS, payload: { data, page }});

export const resethBracelets = (data, page) => ({ type: RESET_BRACELETS, payload: { data, page }});
export const resethKindles = (data, page) => ({ type: RESET_KINDLES, payload: { data, page }});
export const resethBeads = (data, page) => ({ type: RESET_BEADS, payload: { data, page }});
export const resethOthers = (data, page) => ({ type: RESET_OTHERS, payload: { data, page }});

export const setReviewBracelet = item => ({ type: SET_REVIEW_BRACELET, payload: item});
export const setReviewKindle = item => ({ type: SET_REVIEW_KINDLE, payload: item});
export const setReviewBead = item => ({ type: SET_REVIEW_BEAD, payload: item});
export const setReviewOther = item => ({ type: SET_REVIEW_OTHER, payload: item});

export const loadBracelets = page => itemsLoader(page, CATALOG_DATA_TYPE.BRACELETS);
export const loadKindles = page => itemsLoader(page, CATALOG_DATA_TYPE.KINDLES);
export const loadBeads = page => itemsLoader(page, CATALOG_DATA_TYPE.BEADS);
export const loadOthers = page => itemsLoader(page, CATALOG_DATA_TYPE.OTHERS);

export const loadBraceletsItem = id => itemLoader(id, CATALOG_DATA_TYPE.BRACELETS);
export const loadKindlesItem = id => itemLoader(id, CATALOG_DATA_TYPE.KINDLES);
export const loadBeadsItem = id => itemLoader(id, CATALOG_DATA_TYPE.BEADS);
export const loadOthersItem = id => itemLoader(id, CATALOG_DATA_TYPE.OTHERS);

export const reloadBracelets = page => itemsReloader(page, CATALOG_DATA_TYPE.BRACELETS);
export const reloadKindles = page => itemsReloader(page, CATALOG_DATA_TYPE.KINDLES);
export const reloadBeads = page => itemsReloader(page, CATALOG_DATA_TYPE.BEADS);
export const reloadOthers = page => itemsReloader(page, CATALOG_DATA_TYPE.OTHERS);

const typeIds = {
  [CATALOG_DATA_TYPE.BRACELETS]: 1,
  [CATALOG_DATA_TYPE.KINDLES]: 2,
  [CATALOG_DATA_TYPE.BEADS]: 3,
  [CATALOG_DATA_TYPE.OTHERS]: 4,
}

const itemsLoaderSettings = {
  [CATALOG_DATA_TYPE.BRACELETS]: { reset: resethBracelets, setOnReview: setReviewBracelet, setLoading: setBraceletsLoading, pushItems: pushBracelets, url: productsUrl(typeIds[CATALOG_DATA_TYPE.BRACELETS])},
  [CATALOG_DATA_TYPE.KINDLES]: { reset: resethKindles, setOnReview: setReviewKindle, setLoading: setKindlesLoading, pushItems: pushKindles, url: productsUrl(typeIds[CATALOG_DATA_TYPE.KINDLES])},
  [CATALOG_DATA_TYPE.BEADS]: { reset: resethBeads, setOnReview: setReviewBead, setLoading: setBeadsLoading, pushItems: pushBeads, url: productsUrl(typeIds[CATALOG_DATA_TYPE.BEADS])},
  [CATALOG_DATA_TYPE.OTHERS]: { reset: resethOthers, setOnReview: setReviewOther, setLoading: setOthersLoading, pushItems: pushOthers, url: productsUrl(typeIds[CATALOG_DATA_TYPE.OTHERS])},
}

function itemsReloader(page, contentType) {
  console.log('items reload')
  return async function (dispatch, getState, api) {
    const { ui: { language }} = getState();
    const { setLoading, reset, url} = itemsLoaderSettings[contentType];

    dispatch(setLoading());

    const headers = getLangHeader(language);
    const items = await api.get(url, { headers })
      .then(({ data: { data }}) => data)
      .catch(() => []);

    console.log('reset: ', reset);
    return dispatch(reset(items, page));
  }
}

function itemsLoader(page, contentType) {
  return async function (dispatch, getState, api) {
    const { ui: { language }} = getState();
    const { setLoading, pushItems, url} = itemsLoaderSettings[contentType];

    dispatch(setLoading());

    const headers = getLangHeader(language);
    const items = await api.get(url, { headers })
      .then(({ data: { data }}) => data)
      .catch(() => []);
    console.log('items: ', items);
    return dispatch(pushItems(items, page));
  }
}

function itemLoader(id, contentType) {
  return async function (dispatch, getState, api) {
    const { setOnReview } = itemsLoaderSettings[contentType];
    const { ui: { language }} = getState();
    const url = productUrl(+id);
    const headers = getLangHeader(language);
    const item = await api.get(url, { headers })
      .then(({ data }) => data)
      .catch(() => []);

    dispatch(setOnReview(item));

    return item;
  }
}
