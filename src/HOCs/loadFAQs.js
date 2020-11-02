import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RESOURCE_STATUS from '../constants/resourceStatus';
import { loadFaqs } from '../store/content/faqActions';

const mapStateToProps = ({ content: { faq: { astro, beads, bracelets, bars, status }}}) => ({
  data: [...astro, ...beads, ...bracelets, ...bars],
  status
});

const mapDispatchToProps = dispatch => ({
  loadFaqs: () => dispatch(loadFaqs())
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
    ...props
  }) => {
    useEffect(() => {
      if (!data.length && status !== RESOURCE_STATUS.LOADING) {
        loadFaqs();
      }
    }, []);

    return <Component {...props} />;
  })
);

export default loadFAQs;
