import RESOURCE_STATUS from '../../constants/resourceStatus';
import { getLangHeader, faqsUrl } from '../api';

export const SET_FAQs = 'SET_FAQs';
export const SET_FAQs_LOADING = 'SET_FAQs_LOADING';
export const SET_ON_EDIT_FAQ = 'SET_ON_EDIT_FAQ';
export const RESET_FAQs = 'RESET_FAQs';

export const setFaqs = faqs => ({ type: SET_FAQs, payload: faqs });
export const setFaqsLoading = () => ({ type: SET_FAQs_LOADING });
export const editFAQ = item => ({ type: SET_ON_EDIT_FAQ, payload: item });
export const resetFAQs = faqs => ({ type: RESET_FAQs, payload: faqs });

export const reloadFaqs = () => {
  return async (dispatch, getState, api) => {
    const { ui: { language }} = getState();
    const url = faqsUrl();
    const headers = getLangHeader(language);
    const newFqs = await api.get(url, { headers })
      .then(({ data: { data }}) => data.map(faqNormalizer))
      .catch(() => []);
    dispatch(resetFAQs(newFqs));
    return newFqs;
  }
}

export const loadFaqs = () => {
  return async (dispatch, getState, api) => {
    const { content: { faq: { status }}, ui: { language }} = getState();

    if (status === RESOURCE_STATUS.LOADING) return;

    const url = faqsUrl();
    const headers = getLangHeader(language);
    const faqs = await api.get(url, { headers })
      .then(({ data: { data } }) => data.map(faqNormalizer))
      .catch(() => []);

    dispatch(setFaqs(faqs));
    return faqs;
  }
} 

export const createFaq = (faqData) => {
  return async (dispatch) => {
    return null;
  }
}

export const publishFaq = (id) => {
  return async (dispatch) => {
  }
}

const faqNormalizer = ({ date, ...rest }) => ({
  ...rest,
  date: new Date(date)
});

// test
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}