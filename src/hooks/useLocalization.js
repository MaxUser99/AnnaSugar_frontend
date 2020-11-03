import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../store/ui/uiActions';
import LANGS from '../constants/langs';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const translations = {
  [LANGS.RU]: ru,
  [LANGS.EN]: en
};

export function useLocalization() {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.ui.language);

  const setLang = lang => dispatch(changeLanguage(lang));
  const t = key => translations[lang][key] || key;

  return { lang, setLang, t };
}
