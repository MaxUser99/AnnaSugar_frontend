import React from 'react';
import { connect } from 'react-redux';
import Layout from '../layout/faqLayout';
import CatalogItem from './catalogItem';
import { catalogLinks } from '../../constants/links';

const CatalogItems = ({ items, itemClickHandler }) => (
  <Layout title='Каталог' tabs={catalogLinks}>
    {
      items.map(item => (
        <CatalogItem key={item.id} onClick={itemClickHandler} item={item} />
      ))
    }
  </Layout>
);

export default connect(
  null,
  (dispatch, { onItemClick }) => ({
    itemClickHandler: item => dispatch(onItemClick(item))
  })
)(CatalogItems);
