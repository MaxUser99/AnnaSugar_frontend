import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { loadKindles, loadKindlesItem, setReviewKindle, reloadKindles } from '../../store/content/catalogActions';
import { onLangChange } from '../../hooks/onLangChange';
import ItemPage from '../../components/catalogItemPage/catalogItemPage';
import CatalogItems from '../../components/catalogItems/catalogItems';

const Kindles = ({
  kindles,
  page,
  reviewItem,
  loadKindles,
  loadReviewKindle,
  clearHandler,
  reloadKindles
}) => {
  onLangChange(() => reloadKindles(0), 'reloadKindles');

  useEffect(() => {
    if (page === null) loadKindles(0);
  }, []);

  return (
    <StyledRouter basepath='/catalog/kindles'>
      <CatalogItems path='/' onItemClick={setReviewKindle} items={kindles} />
      <ItemPage
        path='/:itemId'
        clearHandler={clearHandler}
        reviewItem={reviewItem}
        loadItem={loadReviewKindle}
      />
    </StyledRouter>
  );
}

const StyledRouter = styled(Router)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default connect(
  ({ content: { kindles: { reviewItem, data, page }}}) => ({
    kindles: data,
    page,
    reviewItem
  }),
  dispatch => ({
    loadKindles: page => dispatch(loadKindles(page)),
    reloadKindles: page => dispatch(reloadKindles(page)),
    loadReviewKindle: id => dispatch(loadKindlesItem(id)),
    clearHandler: () => dispatch(setReviewKindle(null)),
  })
)(Kindles);
