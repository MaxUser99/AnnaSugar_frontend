import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import { loadArticles } from '../../../store/content/articleActions';
import List from '../components/List';
import { setReviewArticle } from '../../../store/content/articleActions';
import Fab from '../components/fab';

const Articles = ({
  articles,
  page,
  loadArticles,
  setReviewArticle,
  navigate
}) => {
  useEffect(() => {
    if (page === null) loadArticles(0);
  }, []);

  const createNewClickHandler = () => navigate('new');

  return (
    <Layout>
      {
        articles && <>
          <List
            data={articles}
            imageField='image'
            nameField='title'
            descriptionField='text'
            dateField='date'
            itemClickHandler={setReviewArticle}
          />
        </>
      }
      <Fab onClick={createNewClickHandler} />
    </Layout>
  );
}

export default connect(
  ({ content: { articles: { data, page }}}) => ({
    page,
    articles: data
  }),
  dispatch => ({
    loadArticles: page => dispatch(loadArticles(page)),
    setReviewArticle: article => dispatch(setReviewArticle(article))
  })
)(Articles);
