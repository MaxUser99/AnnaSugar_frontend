import RESOURCE_STATUS from '../../constants/resourceStatus';

import mockArticles from '../mocks/mockArticles.json';
import randomImage from '../../assets/images/random-image.svg';

export const SET_ARTICLES_LOADING = 'SET_ARTICLES_LOADING';
export const PUSH_ARTICLES = 'PUSH_ARTICLES';
export const SET_REVIEW_ARTICLE = 'SET_REVIEW_ARTICLE';

export const setArticlesLoading = () => ({ type: SET_ARTICLES_LOADING });
export const pushArticles = (articles, page) => ({ type: PUSH_ARTICLES, payload: { articles, page } }); 
export const setReviewArticle = article => ({ type: SET_REVIEW_ARTICLE, payload: article });

export const loadArticles = page => {
  return async (dispatch, getState) => {
    const { content: { articles: { status }}} = getState();

    if (status === RESOURCE_STATUS.LOADING) return;

    dispatch(setArticlesLoading());
    const transformedArticles = mockArticles.map(({ date, ...rest}) => ({
      ...rest,
      date: new Date(date)
    }));

    return delay(500).then(() => dispatch(pushArticles(transformedArticles, page)));
  };
};

export const loadReviewArticle = id => {
  return async (dispatch) => {
    const article = mockArticles.find(x => x.id === id);
    const transformedArticle = article
      ? {
          ...article,
          image: randomImage,
          date: new Date(article.date)
        }
      : null;

    await delay(500).then(() => dispatch(setReviewArticle(transformedArticle)));
    return transformedArticle;
  }
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

// test
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}