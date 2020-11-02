import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { loadOthers, setReviewOther, loadOthersItem } from '../../store/content/catalogActions';
import CatalogItems from '../../components/catalogItems/catalogItems';
import ItemPage from '../../components/catalogItemPage/catalogItemPage';

const Others = ({
  others,
  page,
  loadOthers,
  reviewItem,
  loadReviewItem,
  clearHandler
}) => {
  useEffect(() => {
    if (page === null) loadOthers(0);
  }, []);

  return (
    <StyledRouter basepath='/catalog/others'>
      <CatalogItems path='/' onItemClick={setReviewOther} items={others} />
      <ItemPage
        path='/:itemId'
        clearHandler={clearHandler}
        reviewItem={reviewItem}
        loadItem={loadReviewItem}
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
  ({ content: { others: { reviewItem, data, page }}}) => ({
    others: data,
    page,
    reviewItem
  }),
  dispatch => ({
    loadOthers: page => dispatch(loadOthers(page)),
    loadReviewItem: id => dispatch(loadOthersItem(id)),
    clearHandler: () => dispatch(setReviewOther(null))
  })
)(Others);
