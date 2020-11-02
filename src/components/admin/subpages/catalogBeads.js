import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import Fab from '../components/fab';
import CatalogItem from '../components/catalogItem';
import { loadBeads, setReviewBead } from '../../../store/content/catalogActions';

const CatalogBeads = ({
  beads,
  page,
  loadBeads,
  setReviewBead,
  navigate
}) => {
  useEffect(() => {
    if (page === null) loadBeads(0);
  }, []);

  const newClickHandler = () => navigate('new');

  return (
    <Layout>
      {
        beads.map(item => (
          <CatalogItem
            key={item.id}
            item={item}
            editClickHandler={() => setReviewBead(item)}
          />
        ))
      }
      <Fab onClick={newClickHandler} />
    </Layout>
  );
}

const mapStateToProps = ({ content: { beads: { data, page }}}) => ({
  page,
  beads: data
});

const mapDispatchToProps = dispatch => ({
  loadBeads: page => dispatch(loadBeads(page)),
  setReviewBead: item => dispatch(setReviewBead(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogBeads);
