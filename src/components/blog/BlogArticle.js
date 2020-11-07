import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useLoading } from '../../hooks/useLoading';
import { loadReviewArticle, setReviewArticle } from '../../store/content/articleActions'; 
import Breadscrumb from '../breadscrumb/breadscrumb';
import ArticleLayout from './ArticleLayout';
import Loader from '../loader/loader';
import Button from '../button/button';

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
  lang
}) => {
  const [ prevLang, setLang ] = useState(lang)
  const { shouldRedirect, isLoading } = useLoading(!article, loadReviewArticle);

  const breadscrumbs = useMemo(() => {
    const title = article
      ? article.title
      : '...';

    return [...baseBreadscrumbs, { title, href: '#', disabled: true }];
  }, [ article ]);

  useEffect(() => {
    if (lang !== prevLang) {
      loadReviewArticle();
      setLang(lang);
    }
  }, [ lang ]);

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

const mapStateToProps = ({ ui: { language }, content: { articles: { reviewItem}}}) => ({
  article: reviewItem,
  lang: language
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
