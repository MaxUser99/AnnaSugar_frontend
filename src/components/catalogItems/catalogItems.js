import React, { useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../layout/faqLayout';
import CatalogItem from './catalogItem';
import { catalogLinks } from '../../constants/links';

const CatalogItems = ({ items, itemClickHandler }) => {
  const [minWidth, setMinWidth] = useState();
  
  const setImageWidth = width => setMinWidth(prev => (
    (!prev || width < prev)
    ? width
    : prev
  ))

  return (
    <Layout title='Каталог' tabs={catalogLinks}>
      {
        items.map(item => (
          <CatalogItem
            key={item.id}
            setImageWidth={setImageWidth}
            onClick={itemClickHandler}
            item={item}
            targetImageWidth={minWidth}
          />
        ))
      }
    </Layout>
  );
}

export default connect(
  null,
  (dispatch, { onItemClick }) => ({
    itemClickHandler: item => dispatch(onItemClick(item))
  })
)(CatalogItems);
