import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Breadscrumb from '../breadscrumb/breadscrumb';
import ArticleLayout from './ArticleLayout';
import Loader from '../loader/loader';
import Button from '../button/button';

import { useLoading } from '../../hooks/useLoading';
import { loadReviewArticle, setReviewArticle } from '../../store/content/articleActions'; 
import { onLangChange } from '../../hooks/onLangChange';

const baseBreadscrumbs = [
  {
    title: 'Главная',
    href: '/',
    disabled: false,
  }, {
    title: 'Статьи',
    href: '/blog',
    disabled: false,
  }
];

const BlogArticle = ({
  article,
  loadReviewArticle,
  clearReviewArticle,
  navigate,
}) => {
  const { shouldRedirect, isLoading } = useLoading(!article, loadReviewArticle);

  const breadscrumbs = useMemo(() => {
    const title = article
      ? article.title
      : '...';

    return [...baseBreadscrumbs, { title, href: '#', disabled: true }];
  }, [ article ]);

  onLangChange(() => loadReviewArticle(), 'reloadReviewArticle');

  useEffect(() => clearReviewArticle, []);

  const redirectClickHandler = () => navigate('/blog');

  return (
    <>
      <Breadscrumb breadscrumbs={breadscrumbs} />
      { article && <ArticleLayout article={article} /> }
      { isLoading && <StyledLoader /> }
      {
        shouldRedirect && <>
          <ErrorText>such article doesnt exist</ErrorText>
          <RedirectButton onClick={redirectClickHandler}>Посмотреть все статьи</RedirectButton>
        </>
      }
    </>
  )
};

const StyledLoader = styled(Loader)`
  margin: auto;
`;

const ErrorText = styled.p`
  margin-top: auto;
`;

const RedirectButton = styled(Button)`
  margin-bottom: auto;
`;

const mapStateToProps = ({ content: { articles: { reviewItem }}}) => ({
  article: reviewItem
});

const mapDispatchToProps = (dispatch, { articleId, navigate }) => ({
  loadReviewArticle: () => dispatch(loadReviewArticle(parseInt(articleId, 10))),
  clearReviewArticle: () => dispatch(setReviewArticle(null)),
  navigate
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogArticle);
