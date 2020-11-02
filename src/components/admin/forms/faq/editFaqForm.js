import React, { useEffect, useState } from 'react';
import FaqForm from './faqForm';
import Button from '../../../button/button';
import { connect } from 'react-redux';
import { loadFaqs, editFAQ } from '../../../../store/content/faqActions';
import { SUBMIT_ACTION } from '../../../../constants/submitAction';

const EditFaqForm = ({
  initial,
  id,
  loadFaqs,
  editFAQ,
}) => {
  const [ submitAction, setSubmitAction ] = useState();

  const submitHandler = (data) => {
    console.log('submit: ', data);
    console.log('submit action: ', submitAction);
  }

  const saveClickHandler = () => setSubmitAction(SUBMIT_ACTION.SAVE);
  const publishClickHandler = () => setSubmitAction(SUBMIT_ACTION.PUBLISH);

  useEffect(() => {
    async function loadOnEditFAQ() {
      const allFaqs = await loadFaqs();
      const numId = +id;
      const targetFaq = allFaqs.find(x => x.id === numId);
      if (targetFaq) editFAQ(targetFaq);
      else console.log('should navigate'); 
    }
    console.log('initial: ', initial)
    if (!initial) loadOnEditFAQ();
  }, []);

  return (
    <FaqForm
      title='Edit FAQ'
      disabled={!initial}
      initial={initial}
      formProps={{ onSubmit: submitHandler }}
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

const mapStateToProps = ({ content: { faq: { onEdit }}}) => ({
  initial: onEdit || undefined
});

const mapDispatchToProps = dispatch => ({
  loadFaqs: () => dispatch(loadFaqs()),
  editFAQ: faq => dispatch(editFAQ(faq)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFaqForm);
