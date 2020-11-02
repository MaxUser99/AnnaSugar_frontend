import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../button/button';
import { ReviewForm } from './reviewForm';
import { SUBMIT_ACTION } from '../../../../constants/submitAction';
import { loadReviewItem, editReview, publishReview } from '../../../../store/content/reviewActions';

const EditReviewForm = ({
  id,
  initial,
  loadReviewItem,
  editReview,
  publishReview
}) => {
  const [ submitAction, setSubmitAction ] = useState();
  const [ isLoading, setLoading ] = useState(false); 

  const submitHandler = async (data) => {
    setLoading(true);

    if (submitAction === SUBMIT_ACTION.PUBLISH) {
      await publishReview(initial.id);
    } else if (submitAction === SUBMIT_ACTION.SAVE) {
      await editReview(data);
    }

    setLoading(false);
  }

  const saveClickHandler = () => setSubmitAction(SUBMIT_ACTION.SAVE);
  const publishClickHandler = () => setSubmitAction(SUBMIT_ACTION.PUBLISH);

  useEffect(() => {
    async function loadInitialReview() {
      const initialReview = await loadReviewItem(+id);
      if (!initialReview) console.log('should navigate');
    }

    if (!initial) loadInitialReview();
  }, []);
  console.log('initial: ', initial);
  return (
    <ReviewForm 
      title='Edit Review'
      formProps={{ onSubmit: submitHandler }}
      disabled={isLoading || !initial}
      initial={initial}
      buttons={
        ({ isDirty }) => (
          <>
            <Button type='submit' onClick={saveClickHandler} disabled={!isDirty}>Save</Button>
            <Button type='submit' onClick={publishClickHandler} disabled={!isDirty}>Publish</Button>
          </>
        )
      }
    />
  );
}

const mapStateToProps = ({ content: { reviews: { reviewItem }}}) => ({
  initial: reviewItem || undefined
});

const mapDispatchToProps = dispatch => ({
  loadReviewItem: (id) => dispatch(loadReviewItem(id)),
  editReview: (data) => dispatch(editReview(data)),
  publishReview: (id) => dispatch(publishReview(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm);