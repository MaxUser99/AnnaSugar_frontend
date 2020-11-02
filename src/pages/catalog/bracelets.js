import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { loadBracelets, loadBraceletsItem, setReviewBracelet } from '../../store/content/catalogActions';
import CatalogItems from '../../components/catalogItems/catalogItems';
import ItemPage from '../../components/catalogItemPage/catalogItemPage';

const Bracelets = ({
  bracelets,
  page,
  reviewItem,
  loadBracelets,
  loadReviewBracelet,
  clearHandler
}) => {
  useEffect(() => {
    if (page === null) loadBracelets(0);
  }, []);

  return (
    <StyledRouter basepath='/catalog/bracelets'>
      <CatalogItems path='/' onItemClick={setReviewBracelet} items={bracelets} />
      <ItemPage
        path='/:itemId'
        clearHandler={clearHandler}
        reviewItem={reviewItem}
        loadItem={loadReviewBracelet}
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
  ({ content: { bracelets: { reviewItem, page, data }}}) => ({
    bracelets: data,
    page,
    reviewItem
  }),
  dispatch => ({
    loadBracelets: page => dispatch(loadBracelets(page)),
    loadReviewBracelet: id => dispatch(loadBraceletsItem(id)),
    clearHandler: () => dispatch(setReviewBracelet(null))
  })
)(Bracelets);
