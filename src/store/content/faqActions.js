import mockFAQs from '../mocks/mockFAQs.json';
import FAQsCATEGORIES from '../../constants/FAQs';
import RESOURCE_STATUS from '../../constants/resourceStatus';

export const SET_FAQs = 'SET_FAQs';
export const SET_FAQs_LOADING = 'SET_FAQs_LOADING';
export const SET_ON_EDIT_FAQ = 'SET_ON_EDIT_FAQ';

export const setFaqs = faqs => ({ type: SET_FAQs, payload: faqs });
export const setFaqsLoading = () => ({ type: SET_FAQs_LOADING });
export const editFAQ = item => ({ type: SET_ON_EDIT_FAQ, payload: item });

export const createFaq = (faqData) => {
  return async (dispatch) => {
    console.log('should create new FAQ');
    return null;
  }
}

export const publishFaq = (id) => {
  return async (dispatch) => {
    console.log('should publish: ', id);
  }
}

export const loadFaqs = () => {
  return async (dispatch, getState) => {
    const { content: { faq: { status }}} = getState();

    if (status === RESOURCE_STATUS.LOADING) return;

    // dev
    const prepFAQs = mockFAQs.map((x, i) => ({
      ...x,
      id: i,
      date: new Date()
    }));

    await delay(1000).then(() => dispatch(setFaqs(prepFAQs)));
    return prepFAQs;
  }
} 

// test
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}