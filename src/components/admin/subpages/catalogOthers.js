import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import Fab from '../components/fab';
import CatalogItem from '../components/catalogItem';
import { loadOthers, setReviewOther } from '../../../store/content/catalogActions';

const CatalogOthers = ({
  others,
  page,
  loadOthers,
  setReviewOther,
  navigate
}) => {
  useEffect(() => {
    if (page === null) loadOthers(0);
  }, []);

  const newClickHandler = () => navigate('new');

  return (
    <Layout>
      {
        others.map(item => (
          <CatalogItem
            key={item.id}
            item={item}
            editClickHandler={() => setReviewOther(item)}
          />
        ))
      }
      <Fab onClick={newClickHandler} />
    </Layout>
  );
}

const mapStateToProps = ({ content: { others: { data, page }}}) => ({
  page,
  others: data
});

const mapDispatchToProps = dispatch => ({
  loadOthers: page => dispatch(loadOthers(page)),
  setReviewOther: item => dispatch(setReviewOther(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogOthers);
