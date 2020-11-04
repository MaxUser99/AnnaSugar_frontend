import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useNavigate } from "@reach/router";
import { loadReviews } from '../../store/content/reviewActions';
import ReviewPreview from '../reviewPreview/reviewPreview';
import Container from '../container/container';
import ContentWrapper from '../contentWrapper/contentWrapper';
import Button from '../button/button';
import { $maxWidth, BREAKPOINTS } from '../../theme';

const PREVIEW_ITEMS_COUNT = 3;

const Reviews = ({ reviews, loadReviews, page }) => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate('/reviews/');
  };

  useEffect(() => {
    if (page === null) loadReviews(0);
  }, []);

  return (
    <Root fullWidth>
      <StyledWrapper direction='column' alignItems='center'>
        <Title id='reviews'>Отзывы</Title>
        <ReviewsContainer fullWidth justifyContent='space-between' alignItems='stretch'>
          {
            reviews.slice(0, PREVIEW_ITEMS_COUNT).map(review => (
              <ReviewPreview key={review.id} review={review} />
            ))
          }
        </ReviewsContainer>
        <Button onClick={buttonClickHandler}>еще</Button>
      </StyledWrapper>
    </Root>
  )
}

const Root = styled(Container)`
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'display: none;')}
`;

const StyledWrapper = styled(ContentWrapper)`
  padding-top: 64px;
  padding-bottom: 64px;
`;

const Title = styled.h2`
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  margin: 0 0 32px;
`;

const ReviewsContainer = styled(Container)`
  & + button {
    margin-top: 64px;
  }
`;

export default connect(
  ({ content: { reviews: { data, page }}}) => ({
    reviews: data,
    page
  }),
  dispatch => ({
    loadReviews: page => dispatch(loadReviews(page))
  })
)(Reviews);
