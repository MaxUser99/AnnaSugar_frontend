import mockReviews from '../mocks/mockReviews.json';
import mockReviewImg from '../../assets/images/mock-review.svg';

export const SET_REVIEWS_LOADING = 'SET_REVIEWS_LOADING';
export const PUSH_REVIEWS = 'PUSH_REVIEWS';
export const SET_REVIEW_ITEM = 'SET_REVIEW_ITEM';

export const setReviewsLoading = () => ({ type: SET_REVIEWS_LOADING });
export const pushReviews = (reviews, page) => ({ type: PUSH_REVIEWS, payload: { reviews, page } });
export const setReviewItem = review => ({ type: SET_REVIEW_ITEM, payload: review });

export const loadReviews = page => {
  return dispatch => {
    dispatch(setReviewsLoading());
    const transformedReviews = mockReviews.map(x => ({
      ...x,
      image: mockReviewImg,
      date: new Date()
    }));
    delay(1500).then(() => dispatch(pushReviews(transformedReviews, page)));
  }
}

export const loadReviewItem = id => {
  return async (dispatch) => {
    const review = mockReviews.find(x => x.id === id);
    const transformedReview = review
      ? {
        ...review,
        image: mockReviewImg,
        date: new Date()
      }
      : null;
    await delay(1000).then(() => dispatch(setReviewItem(transformedReview)));
    return transformedReview;
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

// test
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}