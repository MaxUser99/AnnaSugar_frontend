import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import { loadBeads, setReviewBead, loadBeadsItem, reloadBeads } from '../../store/content/catalogActions';
import { onLangChange } from '../../hooks/onLangChange';
import CatalogItems from '../../components/catalogItems/catalogItems';
import ItemPage from '../../components/catalogItemPage/catalogItemPage';

const Beads = ({
  beads,
  page,
  reviewItem,
  loadBeads,
  loadReviewBead,
  clearHandler,
  reloadBeads
}) => {
  onLangChange(() => reloadBeads(0), 'reloadBeads');

  useEffect(() => {
    if (page === null) loadBeads(0);
  }, []);

  return (
    <StyledRouter basepath='/catalog/beads'>
      <CatalogItems path='/' onItemClick={setReviewBead} items={beads} />
      <ItemPage
        path='/:itemId'
        clearHandler={clearHandler}
        reviewItem={reviewItem}
        loadItem={loadReviewBead}
      />
    </StyledRouter>
  );
};

const StyledRouter = styled(Router)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default connect(
  ({ content: { beads: { reviewItem, page, data }}}) => ({
    beads: data,
    reviewItem,
    page
  }),
  dispatch => ({
    loadBeads: page => dispatch(loadBeads(page)),
    reloadBeads: page => dispatch(reloadBeads(page)),
    loadReviewBead: id => dispatch(loadBeadsItem(id)),
    clearHandler: () => dispatch(setReviewBead(null))
  })
)(Beads);
