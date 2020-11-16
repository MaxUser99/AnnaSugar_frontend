import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { useLocalization } from '../../hooks/useLocalization';
import { loadMoreReviews } from '../../store/content/reviewActions';

import Breadscrumb from '../breadscrumb/breadscrumb';
import Button from '../button/button';
import ReviewPreview from '../reviewPreview/reviewPreview';
import Container from '../container/container';


const breadscrumbs = [
  {
    title: 'Главная',
    href: '/',
    disabled: false,
  }, {
    title: 'Отзывы',
    href: '/reviews',
    disabled: true,
  }
];

const ReviewIndex = ({ reviews, page, maxPage, loadMoreReviews }) => {
  const { t } = useLocalization();

  return (
    <>
      <Breadscrumb breadscrumbs={breadscrumbs} />
      <Title>{t('reviews')}</Title>
      <Container alignItems='stretch' justifyContent='center' fullWidth flexWrap>
        {
          reviews.map(review => (
            <StyledPreview key={review.id} review={review} />
          ))
        }
      </Container>
      {
        page < maxPage &&
        <Button onClick={loadMoreReviews}>{t('more')}</Button>
      }
    </>
  );
}

const StyledPreview = styled(ReviewPreview)`
  margin-bottom: 64px;
`;

const Title = styled.h1`
  margin: 16px 0 32px;
  font-family: "Cormorant Infant";
  font-style: normal;
  font-weight: bold;
  font-size: 68px;
  line-height: 68px;
  text-transform: capitalize;
`;

export default connect(
  ({ content: { reviews: { data, page, maxPage }}}) => ({
    reviews: data,
    page,
    maxPage: (maxPage || 0) - 1
  }),
  dispatch => ({
    loadMoreReviews: () => dispatch(loadMoreReviews())
  })
)(ReviewIndex);
