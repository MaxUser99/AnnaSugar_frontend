import { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../store/ui/uiActions';
import LANGS from '../constants/langs';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

let currentTranslate = ru;

export function useLocalization() {
  const dispatch = useDispatch();
  const lang = useSelector(state => state.ui.language);
  const setLang = lang => dispatch(changeLanguage(lang));
  const t = (key) => currentTranslate[key] || key;

  useEffect(() => {
    if (lang === LANGS.RU) currentTranslate = ru;
    if (lang === LANGS.EN) currentTranslate = en;
  }, [ lang ]);

  return { lang, setLang, t };
}
