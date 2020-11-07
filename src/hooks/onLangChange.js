import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function onLangChange(callback) {
  const lang = useSelector(({ ui: { language }}) => language);
  const [ prevLang, setLang ] = useState(lang);

  useEffect(() => {
    if (prevLang !== lang) {
      callback();
      setLang(lang);
    }
  }, [lang])

  return null;
}
