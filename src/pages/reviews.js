import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import { loadReviews } from '../store/content/reviewActions';
import Container from '../components/container/container';
import ContentWrapper from '../components/contentWrapper/contentWrapper';
import ReviewsIndex from '../components/reviews/index';
import ReviewPage from '../components/reviews/reviewPage';
import Layout from '../components/layout/layout';
import { useEmptySpace } from '../hooks/useEmptySpace';

const Reviews = ({ loadReviews, page }) => {
  const minHeight = useEmptySpace(74);

  useEffect(() => {
    if (page === null) loadReviews(0);
  }, []);

  return (
    <Layout>
      <Container fullWidth justifyContent='center'>
        <StyledWrapper alignItems='center' direction='column'>
          <StyledRouter $minHeight={minHeight} basepath='/reviews'>
            <ReviewsIndex path='/' />
            <ReviewPage path='/:reviewId' />
          </StyledRouter>
        </StyledWrapper>
      </Container>
    </Layout>
  );
}


const StyledRouter = styled(Router)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight}px;
`;

const StyledWrapper = styled(ContentWrapper)`
  padding-top: 10px;
  padding-bottom: 64px;
`;


export default connect(
  ({ content: { reviews: { page }}}) => ({
    page
  }),
  dispatch => ({
    loadReviews: page => dispatch(loadReviews(page)),
  })
)(Reviews);
