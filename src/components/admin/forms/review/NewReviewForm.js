import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../button/button';
import { ReviewForm } from './reviewForm';
import { createReview, publishReview } from '../../../../store/content/reviewActions';
import { SUBMIT_ACTION } from '../../../../constants/submitAction';

function isSubmitAllowed(dirtyFields) {
  const requiredFields = [ 'title', 'text', 'descripton' ];
  return requiredFields.every(field => dirtyFields[field] === true);
}

const NewReviewForm = ({ createReview, publishReview }) => {
  const [ submitAction, setSubmitAction ] = useState();
  const [ isLoading, setLoading ] = useState(false); 

  const submitHandler = async (data) => {
    setLoading(true);

    const saveActions = [SUBMIT_ACTION.SAVE, SUBMIT_ACTION.BOTH];
    const publishActions = [SUBMIT_ACTION.PUBLISH, SUBMIT_ACTION.BOTH];

    const savedReview = saveActions.includes(submitAction)
      ? await createReview(data)
      : null;

    if (savedReview && publishActions.includes(submitAction)) {
      await publishReview(savedReview.id);
    }

    setLoading(false);
  }

  const saveClickHandler = () => setSubmitAction(SUBMIT_ACTION.SAVE);
  const publishClickHandler = isDirty => () => setSubmitAction(
    isDirty
    ? SUBMIT_ACTION.BOTH
    : SUBMIT_ACTION.PUBLISH
  );

  return (
    <ReviewForm
      title='New Review'
      formProps={{ onSubmit: submitHandler }}
      disabled={isLoading}
      buttons={
        ({ isDirty, dirtyFields }) => {
          const isDisabled = !isSubmitAllowed(dirtyFields); 
          return (
            <>
              <Button disabled={!isDirty} type='reset'>Reset</Button>
              <Button disabled={isDisabled} onClick={saveClickHandler} type='submit'>
                Save
              </Button>
              <Button disabled={isDisabled} onClick={publishClickHandler(isDirty)} type='submit'>
                {isDirty && 'Save + '}Publish
              </Button>
            </>
          )
        }
      }
    />
  );
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  createReview: data => dispatch(createReview(data)),
  publishReview: id => dispatch(publishReview(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewReviewForm);
