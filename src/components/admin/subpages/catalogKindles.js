import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import Fab from '../components/fab';
import CatalogItem from '../components/catalogItem';

import { loadKindles, setReviewKindle } from '../../../store/content/catalogActions';

const CatalogKindles = ({
  kindles,
  page,
  loadKindles,
  setReviewKindle,
  navigate
}) => {
  useEffect(() => {
    if (page === null) loadKindles(0);
  }, []);

  const newClickHandler = () => navigate('new');

  return (
    <Layout>
      {
        kindles.map(item => (
          <CatalogItem
            key={item.id}
            item={item}
            editClickHandler={() => setReviewKindle(item)}
          />
        ))
      }
      <Fab onClick={newClickHandler} />
    </Layout>
  );
}

const mapStateToProps = ({ content: { kindles: { data, page }}}) => ({
  page,
  kindles: data
});

const mapDispatchToProps = dispatch => ({
  loadKindles: page => dispatch(loadKindles(page)),
  setReviewKindle: item => dispatch(setReviewKindle(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogKindles);
