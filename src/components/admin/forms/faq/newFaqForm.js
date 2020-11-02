import React, { useState } from 'react';
import FaqForm from './faqForm';
import Button from '../../../button/button';
import { connect } from 'react-redux';
import { createFaq, publishFaq } from '../../../../store/content/faqActions';
import { SUBMIT_ACTION } from '../../../../constants/submitAction';

function isSubmitAllowed(dirtyFields) {
  const requiredFields = [ 'title', 'text' ];
  return requiredFields.every(field => dirtyFields[field] === true);
}

const NewFaqForm = ({ createFaq, publishFaq }) => {
  const [ submitAction, setSubmitAction ] = useState();
  const [ isLoading, setLoading ] = useState(false);

  const submitHandler = async (data) => {
    setLoading(true);

    const saveActions = [SUBMIT_ACTION.SAVE, SUBMIT_ACTION.BOTH];
    const publishActions = [SUBMIT_ACTION.PUBLISH, SUBMIT_ACTION.BOTH];

    const savedFaq = saveActions.includes(submitAction)
      ? await createFaq(data)
      : null;

    if (savedFaq && publishActions.includes(submitAction)) {
      await publishFaq(savedFaq.id);
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
    <FaqForm
      title='New FAQ'
      disabled={isLoading}
      formProps={{ onSubmit: submitHandler }}
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
  createFaq: faqData => dispatch(createFaq(faqData)),
  publishFaq: id => dispatch(publishFaq(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFaqForm);
