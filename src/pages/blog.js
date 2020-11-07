import React from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import loadArticles from '../components/indexComponents/loadArticles';
import { useEmptySpace } from '../hooks/useEmptySpace';
import Container from '../components/container/container';
import ContentWrapper from '../components/contentWrapper/contentWrapper';
import Layout from '../components/layout/layout';
import BlogIndex from '../components/blog/index';
import BlogArticle from '../components/blog/BlogArticle';

const Blog = () => {
  const minHeight = useEmptySpace(74); // 74 is padding.bottom + padding.top of StyledWrapper

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

export default loadArticles(Blog);