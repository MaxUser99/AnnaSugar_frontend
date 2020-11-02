import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import Fab from '../components/fab';
import CatalogItem from '../components/catalogItem';
import { loadBracelets, setReviewBracelet } from '../../../store/content/catalogActions';

const CatalogBracelets = ({
  bracelets,
  page,
  loadBracelets,
  setReviewBracelet,
  navigate
}) => {
  useEffect(() => {
    if (page === null) loadBracelets(0);
  }, []);

  const newClickHandler = () => navigate('new');

  return (
    <Layout>
      {
        bracelets.map(item => (
          <CatalogItem
            key={item.id}
            item={item}
            editClickHandler={() => setReviewBracelet(item)}
          />
        ))
      }
      <Fab onClick={newClickHandler} />
    </Layout>
  );
}

const mapStateToProps = ({ content: { bracelets: { data, page }}}) => ({
  page,
  bracelets: data
});

const mapDispatchToProps = dispatch => ({
  loadBracelets: page => dispatch(loadBracelets(page)),
  setReviewBracelets: item => dispatch(setReviewBracelet(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogBracelets);
