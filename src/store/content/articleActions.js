import RESOURCE_STATUS from '../../constants/resourceStatus';
import { getLangHeader, articlesUrl, articleUrl } from '../api';

export const SET_ARTICLES_LOADING = 'SET_ARTICLES_LOADING';
export const PUSH_ARTICLES = 'PUSH_ARTICLES';
export const SET_REVIEW_ARTICLE = 'SET_REVIEW_ARTICLE';
export const RESET_ARTICLES = 'RESET_ARTICLES';

export const setArticlesLoading = () => ({ type: SET_ARTICLES_LOADING });
export const pushArticles = (articles, page, maxPage) => ({ type: PUSH_ARTICLES, payload: { articles, page, maxPage } }); 
export const setReviewArticle = article => ({ type: SET_REVIEW_ARTICLE, payload: article });
export const resetArticles = (articles, maxPage) => ({ type: RESET_ARTICLES, payload: {articles, maxPage} });

export const loadMoreArticles = () => {
  return (dispatch, getState) => {
    const { content: { articles: { page, maxPage }} } = getState();

    if (page < maxPage) {
      return dispatch(loadArticles(page + 1));
    }
  }
}

export const reloadArticles = () => {
  const pages = [0, 1];

  return async (dispatch, getState, api) => {
    const { ui: { language }} = getState();

    for (const page of pages) {
      const { articles, maxPage } = await getArticles(api, language, page  + 1);

      if (page === pages[0]) dispatch(resetArticles(articles, maxPage));
      else dispatch(pushArticles(articles, page, maxPage));
    }
  }
}

export const loadArticles = page => {
  return async (dispatch, getState, api) => {
    const { content: { articles: { status }}, ui: { language }} = getState();

    if (status === RESOURCE_STATUS.LOADING) return;

    dispatch(setArticlesLoading());

    const {articles, maxPage} = await getArticles(api, language, page + 1);

    return dispatch(pushArticles(articles, page, maxPage));
  };
};

export const loadReviewArticle = id => {
  return async (dispatch, getState, api) => {
    const { ui: { language }} = getState();

    const article = await getArticle(api, id, language);

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

async function getArticles(api, lang, page) {
  const url = articlesUrl(page);
  const headers = getLangHeader(lang);
  return await api.get(url, { headers })
    .then(({ data: { data, meta: { last_page } }}) => ({
      articles: data.map(articleNormalizer),
      maxPage: last_page
    }))
    .catch(() => ({
      articles: [],
      maxPage: 0
    }));
}

export const editArticle = (data) => {
  return async dispatch => {
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