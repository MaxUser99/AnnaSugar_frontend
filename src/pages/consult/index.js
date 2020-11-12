import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { consultLinks } from '../../constants/links';
import Layout from '../../components/layout/layout';
import { loadAstro, loadRitual, loadRune, loadTaro } from '../../store/content/consultActions';
import { onLangChange } from '../../hooks/onLangChange';

const ConsultIndex = () => {
  useEffect(() => {
    navigate(consultLinks[0].href);
  }, []);

  return <Layout title='Консультации' />;
}

export default ConsultIndex;

export const consultWrapper = Component => {
  return props => {
    const dispatch = useDispatch();

    onLangChange(() => {
      dispatch(loadAstro());
      dispatch(loadTaro());
      dispatch(loadRune());
      dispatch(loadRitual());
    }, 'reloadConsultations');

    return <Component {...props} />;
  }
}
