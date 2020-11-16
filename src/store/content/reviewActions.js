import { reviewUrl, reviewsUrl, getLangHeader } from '../api';

export const SET_REVIEWS_LOADING = 'SET_REVIEWS_LOADING';
export const PUSH_REVIEWS = 'PUSH_REVIEWS';
export const SET_REVIEW_ITEM = 'SET_REVIEW_ITEM';

export const setReviewsLoading = () => ({ type: SET_REVIEWS_LOADING });
export const pushReviews = (reviews, page, maxPage) => ({ type: PUSH_REVIEWS, payload: { reviews, page, maxPage } });
export const setReviewItem = review => ({ type: SET_REVIEW_ITEM, payload: review });
export const editReview = () => {};

export const loadMoreReviews = () => {
  return (dispatch, getState) => {
    const { content: { reviews: { page, maxPage }}} = getState();

    if (page < maxPage) {
      return dispatch(loadReviews(page + 1));
    }
  }
}

export const loadReviews = page => {
  return async (dispatch, getState, api) => {
    dispatch(setReviewsLoading());
    const { ui: { language }} = getState();
    const url = reviewsUrl(page + 1);
    const headers = getLangHeader(language);
    const { reviews, maxPage } = await api.get(url, { headers })
      .then(({ data: { data, meta: { last_page } }}) => ({
        reviews: data.map(reviewNormalizer),
        maxPage: last_page,
      }))
      .catch(() => ({
        reviews: [],
        maxPage: 0
      }));

      dispatch(pushReviews(reviews, page, maxPage));
  }
}

export const loadReviewItem = id => {
  return async (dispatch, getState, api) => {
    const { ui: { language }} = getState();
    const url = reviewUrl(+id);
    const headers = getLangHeader(language);
    const review = await api.get(url, { headers })
      .then(({ data }) => reviewNormalizer(data))
      .catch(() => null);
    dispatch(setReviewItem(review));
    return review;
  }
}

export const createReview = date => {
  return async (dispatch) => {
    return null;
  }
}

export const publishReview = date => {
  return async (dispatch) => {
    return null;
  }
}

const reviewNormalizer = ({ date, ...rest }) => ({
  ...rest,
  date: new Date(date)
});

// test
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}