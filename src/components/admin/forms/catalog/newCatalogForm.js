import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../button/button';
import CatalogForm from './catalogForm';
import { SUBMIT_ACTION } from '../../../../constants/submitAction';
import { CATALOG_DATA_TYPE } from '../../../../constants/catalogDataType';
import { 
  createBracelet,
  createKindle,
  createBead,
  createOther,
  publishBracelet,
  publishKindle,
  publishBead,
  publishOther,
 } from '../../../../store/content/catalogActions';

function isSubmitAllowed(dirtyFields) {
  const requiredFields = [ ];
  return requiredFields.every(field => dirtyFields[field] === true);
}

const NewCatalogForm = ({ createItem, publishItem, title }) => {
  const [ submitAction, setSubmitAction ] = useState();
  const [ isLoading, setLoading ] = useState(false); 

  const submitHandler = async (data) => {
    setLoading(true);

    const saveActions = [SUBMIT_ACTION.SAVE, SUBMIT_ACTION.BOTH];
    const publishActions = [SUBMIT_ACTION.PUBLISH, SUBMIT_ACTION.BOTH];

    const savedItem = saveActions.includes(submitAction)
      ? await createItem(data)
      : null;

    if (savedItem && publishActions.includes(submitAction)) {
      await publishItem(savedArticle.id);
    }

    setLoading(false);
  }

  const saveClickHandler = () => setSubmitAction(SUBMIT_ACTION.SAVE);
  const publishClickHandler = isDirty => () => setSubmitAction(
    isDirty
    ? SUBMIT_ACTION.BOTH
    : SUBMIT_ACTION.PUBLISH
  );

  // return <div>qwer</div>;

  return (
    <CatalogForm
      title={`New ${title}`}
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

const mapStateToProps = (state, { path }) => {
  const dataType = Object.values(CATALOG_DATA_TYPE).find(subpath => path.includes(subpath.toLowerCase()));

  const title = titles[dataType];

  return { title };
};

const mapDispatchToProps = (dispatch, { path }) => {
  const dataType = Object.values(CATALOG_DATA_TYPE).find(subpath => path.includes(subpath.toLowerCase()));

  const { createAction, publishAction } = actions[dataType]; 

  return {
    createItem: data => dispatch(createAction(data)),
    publishItem: id => dispatch(publishAction(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCatalogForm);

const titles = {
  [CATALOG_DATA_TYPE.BRACELETS]: 'Bracelet',
  [CATALOG_DATA_TYPE.KINDLES]: 'Kindle',
  [CATALOG_DATA_TYPE.BEADS]: 'Bead',
  [CATALOG_DATA_TYPE.OTHERS]: 'Other',
};

const actions = {
  [CATALOG_DATA_TYPE.BRACELETS]: {
    createAction: createBracelet,
    publishAction: publishBracelet
  },
  [CATALOG_DATA_TYPE.KINDLES]: {
    createAction: createKindle,
    publishAction: publishKindle
  },
  [CATALOG_DATA_TYPE.BEADS]: {
    createAction: createBead,
    publishAction: publishBead
  },
  [CATALOG_DATA_TYPE.OTHERS]: {
    createAction: createOther,
    publishAction: publishOther
  },
};
