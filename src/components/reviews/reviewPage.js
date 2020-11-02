import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadReviewItem, setReviewItem } from '../../store/content/reviewActions';
import Loader from '../loader/loader';
import Button from '../button/button';
import ReviewLayout from './reviewLayout.js';
import Breadscrumb from '../breadscrumb/breadscrumb';

const baseBreadscrumbs = [
  {
    title: 'Главная',
    href: '/',
    disabled: false,
  }, {
    title: 'Отзывы',
    href: '/reviews',
    disabled: false,
  }
];

const ReviewPage = ({
  review,
  loadReviewItem,
  clearReviewItem,
  navigate
}) => {
  const [ shouldRedirect, setRedirect ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);

  const breadscrumbs = useMemo(() => {
    const title = review
      ? review.title
      : '...';
    return [...baseBreadscrumbs, { title, href: '#', disabled: true }];
  }, [ review ]);

  useEffect(() => {
    const loadReview = async () => {
      setLoading(true);
      const loadedReview = await loadReviewItem();
      setLoading(false);
      if (!loadedReview) setRedirect(true);
    }
    if (!review) loadReview();
    return () => clearReviewItem();
  }, []);

  const redirectClickHandler = () => navigate('/reviews');

  return (
    <>
      <Breadscrumb breadscrumbs={breadscrumbs} />
      { review && <ReviewLayout review={review} /> }
      { isLoading && <StyledLoader /> }
      {
        shouldRedirect && <>
          <ErrorText>such review doesnt exist</ErrorText>
          <RedirectButton onClick={redirectClickHandler}>Посмотреть все отзывы</RedirectButton>
        </>
      }
    </>
  );
}

const StyledLoader = styled(Loader)`
  margin: auto;
`;

const ErrorText = styled.p`
  margin-top: auto;
`;

const RedirectButton = styled(Button)`
  margin-bottom: auto;
`;

export default connect(
  ({ content: { reviews: { reviewItem }}}) => ({
    review: reviewItem
  }),
  (dispatch, { reviewId, navigate}) => ({
    loadReviewItem: () => dispatch(loadReviewItem(parseInt(reviewId, 10))),
    clearReviewItem: () => dispatch(setReviewItem(null)),
    navigate
  })
)(ReviewPage);
