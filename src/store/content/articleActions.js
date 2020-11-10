import RESOURCE_STATUS from '../../constants/resourceStatus';
import { getLangHeader, articlesUrl, articleUrl } from '../api';

export const SET_ARTICLES_LOADING = 'SET_ARTICLES_LOADING';
export const PUSH_ARTICLES = 'PUSH_ARTICLES';
export const SET_REVIEW_ARTICLE = 'SET_REVIEW_ARTICLE';
export const RESET_ARTICLES = 'RESET_ARTICLES';

export const setArticlesLoading = () => ({ type: SET_ARTICLES_LOADING });
export const pushArticles = (articles, page) => ({ type: PUSH_ARTICLES, payload: { articles, page } }); 
export const setReviewArticle = article => ({ type: SET_REVIEW_ARTICLE, payload: article });
export const resetArticles = articles => ({ type: RESET_ARTICLES, payload: articles });

export const reloadArticles = page => {
  return async (dispatch, getState, api) => {
    const { ui: { language }} = getState();

    const articles = await getArticles(api, language);

    dispatch(resetArticles(articles));
  }
}

export const loadArticles = page => {
  return async (dispatch, getState, api) => {
    const { content: { articles: { status }}, ui: { language }} = getState();

    if (status === RESOURCE_STATUS.LOADING) return;

    dispatch(setArticlesLoading());

    const articles = await getArticles(api, language);
    console.log('loaded articles: ', articles);

    return dispatch(pushArticles(articles, page));
  };
};

export const loadReviewArticle = id => {
  return async (dispatch, getState, api) => {
    const { ui: { language }} = getState();

    const article = await getArticle(api, id, language);
    console.log('loaded article: ', article);

    dispatch(setReviewArticle(article));
    return article;
  }
}

async function getArticle(api, id, lang) {
  const url = articleUrl(+id);
  const headers = getLangHeader(lang);
  return await api.get(url, { headers })
    .then(({ data }) => articleNormalizer(data))
    .catch(() => null);
}

async function getArticles(api, lang) {
  const url = articlesUrl();
  const headers = getLangHeader(lang);
  return await api.get(url, { headers })
    .then(({ data: { data }}) => data.map(articleNormalizer))
    .catch(() => []);
}

export const editArticle = (data) => {
  return async dispatch => {
    console.log('should edit article: ', data);
    return null;
  }
}

export const publishArticle = id => {
  return async dispatch => {
    return null;
  }
}

export const createArticle = data => {
  return async dispatch => {
    return null;
  }
}

const articleNormalizer = ({ date, ...rest }) => ({
  ...rest,
  date: new Date(date)
});

// test
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}