import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import List from '../components/List';
import Fab from '../components/fab';
import { loadReviews, setReviewItem } from '../../../store/content/reviewActions';

const Reviews = ({
  reviews,
  page,
  loadReviews,
  setReviewItem,
  navigate
}) => {
  useEffect(() => {
    if (page === null) loadReviews(0);
  }, []);

  const newClickHandler = () => navigate('new');

  return (
    <Layout>
      {
        reviews && <>
          <List
            data={reviews}
            imageField='image'
            nameField='title'
            descriptionField='text'
            dateField='date'
            itemClickHandler={setReviewItem}
          />
        </>
      }
      <Fab onClick={newClickHandler} />
    </Layout>
  );
}

const mapStateToProps = ({ content: { reviews: { data, page }}}) => ({
  page,
  reviews: data
});

const mapDispatchToProps = dispatch => ({
  loadReviews: page => dispatch(loadReviews(page)),
  setReviewItem: item => dispatch(setReviewItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
