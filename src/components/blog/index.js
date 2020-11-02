import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Breadscrumb from '../breadscrumb/breadscrumb';
import Preview from '../preview/preview';
import Button from '../button/button';
import { setReviewArticle } from '../../store/content/articleActions';

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

const BlogIndex = ({ articles, setReviewArticle }) => (
  <>
    <Breadscrumb breadscrumbs={breadscrumbs} />
    <Title>Статьи</Title>
    {
      articles.map(article => (
        <Preview
          key={article.id}
          image={article.image}
          name={article.title}
          description={article.short}
          date={article.date}
          linkProps={{
            show: true,
            text: 'Read \u003E',
            to: `/blog/${article.id}`,
            onClick: () => setReviewArticle(article)
          }}
        />
      ))
    }
    <StyledButton>больше</StyledButton>
  </>
);

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
`;

export default connect(
  ({ content: { articles: { data }}}) => ({
    articles: data
  }),
  dispatch => ({
    setReviewArticle: article => dispatch(setReviewArticle(article))
  })
)(BlogIndex);
