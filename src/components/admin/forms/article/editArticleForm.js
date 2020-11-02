import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../button/button';
import ArticleForm from './articleForm';
import { SUBMIT_ACTION } from '../../../../constants/submitAction';
import { loadReviewArticle, editArticle, publishArticle } from '../../../../store/content/articleActions';

const EditArticleForm = ({
  id,
  initial,
  loadReviewArticle,
  editArticle,
  publishArticle
}) => {
  const [ submitAction, setSubmitAction ] = useState();
  const [ isLoading, setLoading ] = useState(false); 

  const submitHandler = async (data) => {
    setLoading(true);

    if (submitAction === SUBMIT_ACTION.PUBLISH) {
      await publishArticle(initial.id);
    } else if (submitAction === SUBMIT_ACTION.SAVE) {
      await editArticle(data);
    }

    setLoading(false);
  }

  const saveClickHandler = () => setSubmitAction(SUBMIT_ACTION.SAVE);
  const publishClickHandler = () => setSubmitAction(SUBMIT_ACTION.PUBLISH);

  useEffect(() => {
    async function loadInitialArticle() {
      const initialArticle = await loadReviewArticle(+id);
      if (!initialArticle) console.log('should navigate');
    }

    if (!initial) loadInitialArticle();
  }, []);

  return (
    <ArticleForm
      title='Edit Article'
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

const mapStateToProps = ({ content: { articles: { reviewItem }}}) => ({
  initial: reviewItem || undefined
});

const mapDispatchToProps = dispatch => ({
  loadReviewArticle: (id) => dispatch(loadReviewArticle(id)),
  editArticle: (data) => dispatch(editArticle(data)),
  publishArticle: (id) => dispatch(publishArticle(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleForm);
