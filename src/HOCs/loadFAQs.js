import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RESOURCE_STATUS from '../constants/resourceStatus';
import { loadFaqs, reloadFaqs } from '../store/content/faqActions';

const mapStateToProps = ({ ui: { language }, content: { faq: { astro, beads, bracelets, bars, status }}}) => ({
  data: [...astro, ...beads, ...bracelets, ...bars],
  language,
  status
});

const mapDispatchToProps = dispatch => ({
  loadFaqs: () => dispatch(loadFaqs()),
  reloadFaqs: () => dispatch(reloadFaqs()) 
});

const loadFAQs = (Component) => (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(({
    faq,
    status,
    data,
    loadFaqs,
    reloadFaqs,
    language,
    ...props
  }) => {
    const [prevLang, setLang] = useState(language);

    useEffect(() => {
      if (!data.length && status !== RESOURCE_STATUS.LOADING) {
        loadFaqs();
      } 
    }, []);

    useEffect(() => {
      if (prevLang !== language) {
        reloadFaqs();
        setLang(language);
      }
    }, [language]);

    return <Component {...props} />;
  })
);

export default loadFAQs;
