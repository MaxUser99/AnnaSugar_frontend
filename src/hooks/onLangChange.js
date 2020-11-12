import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { LangContext } from '../store/reduxWrapper';

export function onLangChange(callback) {
  const lang = useSelector(({ ui: { language }}) => language);
  const langContext = useContext(LangContext);

  useEffect(() => {
    console.log()
    if (langContext.prevLang !== lang) {
      callback();
      langContext.setLang(lang);
    }
  }, [lang])

  return null;
}
