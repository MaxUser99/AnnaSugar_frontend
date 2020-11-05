import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Breadscrumb from '../breadscrumb/breadscrumb';
import Button from '../button/button';
import ReviewPreview from '../reviewPreview/reviewPreview';
import Container from '../container/container';
import { useLocalization } from '../../hooks/useLocalization';

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

const ReviewIndex = ({ reviews }) => {
  const { t } = useLocalization();

  return (
    <>
      <Breadscrumb breadscrumbs={breadscrumbs} />
      <Title>{t('reviews')}</Title>
      <Container alignItems='stretch' justifyContent='space-between' fullWidth flexWrap>
        {
          reviews.map(review => (
            <StyledPreview key={review.id} review={review} />
          ))
        }
      </Container>
      <StyledButton>{t('more')}</StyledButton>
    </>
  );
}

const StyledPreview = styled(ReviewPreview)`
  margin-bottom: 64px;
`;

const StyledButton = styled(Button)`
  // margin-top: 99px;
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
  ({ content: { reviews: { data }}}) => ({
    reviews: data
  }),
  null
)(ReviewIndex);
