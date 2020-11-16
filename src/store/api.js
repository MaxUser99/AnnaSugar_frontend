import axios from 'axios';
import LANGS from '../constants/langs';

const instance = axios.create({
  baseURL: 'https://annasugar.ru/api',
  headers: {
    'x-api-key': 'R29vNXtNi3bOnS9x2glvaEMwGsOOhnVR9qIZh4Lx1CY',
  }
});

const langHeaders = {
  [LANGS.RU]: 'ru',
  [LANGS.EN]: 'en'
};

export const faqsUrl = () => '/faqs';
export const faqUrl = (category) => `/faqs/c/${category}`;
export const consultsUrl = (category) => `/services/c/${category}`;
export const productsUrl = (category) => `/products/c/${category}`;
export const productUrl = (id) => `/products/${id}`;
export const reviewsUrl = (page) => `/reviews?page=${page}`;
export const reviewUrl = (id) => `/reviews/${id}`;
export const articlesUrl = (page) => `/posts?page=${page}`;
export const articleUrl = (id) => `/posts/${id}`;
export const emailUrl = () => '/email';
export const staticTextUrl = () => '/static';

export const getLangHeader = lang => ({ "x-lang": langHeaders[lang]});
export default instance;

