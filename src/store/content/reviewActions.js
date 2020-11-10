import { reviewUrl, reviewsUrl, getLangHeader } from '../api';

export const SET_REVIEWS_LOADING = 'SET_REVIEWS_LOADING';
export const PUSH_REVIEWS = 'PUSH_REVIEWS';
export const SET_REVIEW_ITEM = 'SET_REVIEW_ITEM';

export const setReviewsLoading = () => ({ type: SET_REVIEWS_LOADING });
export const pushReviews = (reviews, page) => ({ type: PUSH_REVIEWS, payload: { reviews, page } });
export const setReviewItem = review => ({ type: SET_REVIEW_ITEM, payload: review });
export const editReview = () => {};

export const loadReviews = page => {
  return async (dispatch, getState, api) => {
    dispatch(setReviewsLoading());
    const { ui: { language }} = getState();
    const url = reviewsUrl();
    const headers = getLangHeader(language);
    const reviews = await api.get(url, { headers })
      .then(({ data: { data }}) => data.map(reviewNormalizer))
      .catch(() => []);

      dispatch(pushReviews(reviews, page));
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
    console.log('review: ', review);
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