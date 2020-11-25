import { faqLinks } from '../constants/links';
import LANGS from '../constants/langs';
import { useLocalization } from './useLocalization';

const forbiddenLinks = {
  [LANGS.EN]: ['astro', 'bars'],
  [LANGS.RU]: [],
}

export function useFaqLinks() {
  const { lang } = useLocalization();
  return faqLinks.filter(({ href }) => forbiddenLinks[lang].includes(href) === false);
}