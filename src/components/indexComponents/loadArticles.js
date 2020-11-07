import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticles, reloadArticles } from '../../store/content/articleActions';

const mapStateToProps = ({ content: { articles: { data, page }}, ui: { language }}) => ({
  lang: language,
  page
});

const mapDispatchToProps = dispatch => ({
  loadArticles: (page) => dispatch(loadArticles(page)),
  reloadArticles: () => dispatch(reloadArticles())
});

export default (Component) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ page, reloadArticles, loadArticles, lang, ...props}) => {
    const [ prevLang, setLang ] = useState(lang)

    useEffect(() => {
      if (page === null) loadArticles(0);
    }, [])

    useEffect(() => {
      if (prevLang !== lang) {
        reloadArticles();
        setLang(lang);
      }
    }, [ lang ]);

    return <Component {...props} />
  });
}