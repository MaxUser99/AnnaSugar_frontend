import { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { LangContext } from '../store/reduxWrapper';

export function onLangChange(callback, key) {
  const lang = useSelector(({ ui: { language }}) => language);
  const { saveCallback } = useContext(LangContext);

  useEffect(() => saveCallback(key, lang, callback), [lang]);

  return null;
}
