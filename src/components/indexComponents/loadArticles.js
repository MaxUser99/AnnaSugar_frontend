import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadArticles, reloadArticles } from '../../store/content/articleActions';
import { onLangChange } from '../../hooks/onLangChange';

export default (Component) => {
  return (props) => {
    const dispatch = useDispatch();
    const page = useSelector(({ content: { articles: { page }}}) => page);

    useEffect(() => {
      if (page === null) dispatch(loadArticles(0));
    }, [])

    onLangChange(() => dispatch(reloadArticles()));

    return <Component {...props} />
  };
}