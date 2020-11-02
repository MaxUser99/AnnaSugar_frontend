import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Router } from '@reach/router';
import { loadArticles } from '../store/content/articleActions';
import { useEmptySpace } from '../hooks/useEmptySpace';
import Container from '../components/container/container';
import ContentWrapper from '../components/contentWrapper/contentWrapper';
import Layout from '../components/layout/layout';
import BlogIndex from '../components/blog/index';
import BlogArticle from '../components/blog/BlogArticle';

const Blog = ({ loadArticles, page }) => {
  const minHeight = useEmptySpace(74); // 74 is padding.bottom + padding.top of StyledWrapper

  useEffect(() => {
    if (page === null) loadArticles(0);
  }, []);

  return (
    <Layout>
      <Container fullWidth justifyContent='center'>
        <StyledWrapper alignItems='center' direction='column'>
          <StyledRouter $minHeight={minHeight} basepath='/blog' >
            <BlogIndex path='/' />
            <BlogArticle path='/:articleId' />
          </StyledRouter>
        </StyledWrapper>
      </Container>
    </Layout> 
  );
};

const StyledRouter = styled(Router)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: ${({ $minHeight }) => (`${$minHeight}px`)};
`;

const StyledWrapper = styled(ContentWrapper)`
  padding-top: 10px;
  padding-bottom: 64px;
`;

export default connect(
  ({ content: { articles: { page }}}) => ({
    page
  }),
  dispatch => ({
    loadArticles: page => dispatch(loadArticles(page))
  })
)(Blog);