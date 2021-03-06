import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useNavigate } from "@reach/router";
import { loadReviews } from '../../store/content/reviewActions';
import ReviewPreview from '../reviewPreview/reviewPreview';
import Container from '../container/container';
import ContentWrapper from '../contentWrapper/contentWrapper';
import Button from '../button/button';
import { $maxWidth, $between, BREAKPOINTS } from '../../theme';
import { useLocalization } from '../../hooks/useLocalization';

const PREVIEW_ITEMS_COUNT = 3;

const Reviews = ({ reviews, loadReviews, page }) => {
  const navigate = useNavigate();
  const { t } = useLocalization();

  const buttonClickHandler = () => {
    navigate('/reviews/');
  };

  useEffect(() => {
    if (page === null) loadReviews(0);
  }, []);

  return (
    <Root fullWidth>
      <StyledWrapper direction='column' alignItems='center'>
        <Title id='reviews'>{t('reviews')}</Title>
        <ReviewsContainer fullWidth justifyContent='space-between' alignItems='stretch'>
          {
            reviews.slice(0, PREVIEW_ITEMS_COUNT).map(review => (
              <ReviewPreview key={review.id} review={review} />
            ))
          }
        </ReviewsContainer>
        <Button onClick={buttonClickHandler}>{t('more')}</Button>
      </StyledWrapper>
    </Root>
  )
}

const Root = styled(Container)`
`;

const StyledWrapper = styled(ContentWrapper)`
  padding-top: 64px;
  padding-bottom: 64px;
  ${ $between(BREAKPOINTS.DESCTOP, BREAKPOINTS.XL, `max-width: 1030px;`)}
`;

const Title = styled.h2`
  text-transform: capitalize;
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  margin: 0 0 32px;
`;

const ReviewsContainer = styled(Container)`
  + button {
    margin-top: 64px;
  }
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    flex-direction: column;
    align-items: center;
    > div:not(:last-child) {
      margin-bottom: 20px;
    }
  `)}
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
