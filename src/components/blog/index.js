import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setReviewArticle, loadMoreArticles } from '../../store/content/articleActions';
import { useLocalization } from '../../hooks/useLocalization';

import Breadscrumb from '../breadscrumb/breadscrumb';
import Preview from '../preview/preview';
import Button from '../button/button';

const breadscrumbs = [
  {
    title: 'Главная',
    href: '/',
    disabled: false,
  }, {
    title: 'Статьи',
    href: '/blog',
    disabled: true,
  }
];

const BlogIndex = ({ articles, page, maxPage, loadMoreClickHandler }) => {
  const { t } = useLocalization();

  return (
    <>
      <Breadscrumb breadscrumbs={breadscrumbs} />
      <Title>{t('Статьи')}</Title>
      {
        articles.map(article => (
          <Preview
            key={article.id}
            image={article.image}
            name={article.title}
            description={article.short}
            date={article.date}
            linkTo={`/blog/${article.id}`}
          />
        ))
      }
      {
        page < maxPage - 1 && 
        <StyledButton onClick={loadMoreClickHandler}>{t('more')}</StyledButton>
      }
    </>
  );
}

const StyledButton = styled(Button)`
  margin-top: 99px;
`;

const Title = styled.h1`
  font-family: "Cormorant Infant";
  font-style: normal;
  font-weight: bold;
  font-size: 68px;
  line-height: 68px;
  margin: 32px 0;
  text-transform: capitalize;
`;

export default connect(
  ({ content: { articles: { data, page, maxPage }}}) => ({
    articles: data,
    maxPage: maxPage || 0,
    page,
  }),
  dispatch => ({
    setReviewArticle: article => dispatch(setReviewArticle(article)),
    loadMoreClickHandler: () => dispatch(loadMoreArticles())
  })
)(BlogIndex);
