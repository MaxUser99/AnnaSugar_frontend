import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadArticles, reloadArticles } from '../../store/content/articleActions';
import { onLangChange } from '../../hooks/onLangChange';



export default (Component) => {
  return (props) => {
    const dispatch = useDispatch();
    const page = useSelector(({ content: { articles: { page }}}) => page);

    useEffect(() => {
      async function loadData() {
        if (page !== null) return;
        await dispatch(loadArticles(0));
        await dispatch(loadArticles(1));
      }
      loadData();

    }, [])

    onLangChange(() => dispatch(reloadArticles()), 'reloadArticles');

    return <Component {...props} />
  };
}