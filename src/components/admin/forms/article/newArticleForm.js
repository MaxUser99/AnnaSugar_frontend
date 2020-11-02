import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../button/button';
import ArticleForm from './articleForm';
import { createArticle, publishArticle } from '../../../../store/content/articleActions';
import { SUBMIT_ACTION } from '../../../../constants/submitAction';

function isSubmitAllowed(dirtyFields) {
  const requiredFields = [ 'title', 'text', 'descripton' ];
  return requiredFields.every(field => dirtyFields[field] === true);
}

const NewArticleForm = ({ createArticle, publishArticle }) => {
  const [ submitAction, setSubmitAction ] = useState();
  const [ isLoading, setLoading ] = useState(false); 

  const submitHandler = async (data) => {
    setLoading(true);

    const saveActions = [SUBMIT_ACTION.SAVE, SUBMIT_ACTION.BOTH];
    const publishActions = [SUBMIT_ACTION.PUBLISH, SUBMIT_ACTION.BOTH];

    const savedArticle = saveActions.includes(submitAction)
      ? await createArticle(data)
      : null;

    if (savedArticle && publishActions.includes(submitAction)) {
      await publishArticle(savedArticle.id);
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
    <ArticleForm
      title='New Article'
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
  createArticle: data => dispatch(createArticle(data)),
  publishArticle: id => dispatch(publishArticle(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticleForm);
