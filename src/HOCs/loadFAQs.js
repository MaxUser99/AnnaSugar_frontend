import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RESOURCE_STATUS from '../constants/resourceStatus';
import { loadFaqs, reloadFaqs } from '../store/content/faqActions';
import { onLangChange } from '../hooks/onLangChange';

const loadFAQs = (Component) => (
  (props) => {
    const dispatch = useDispatch();
    const { data, status } = useSelector(({ content: { faq: { astro, beads, bracelets, bars, status }} }) => ({
      data: [...astro, ...beads, ...bracelets, ...bars],
      status
    }));

    onLangChange(() => dispatch(reloadFaqs()), 'reloadFaqs');

    useEffect(() => {
      if (!data.length && status !== RESOURCE_STATUS.LOADING) {
        dispatch(loadFaqs());
      } 
    }, []);

    return <Component {...props} />;
  }
);

export default loadFAQs;
