import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Layout from '../../components/layout';
import Container from '../../../container/container';
import LANGS from '../../../../constants/langs';
import Input from '../../../input/input';
import Header from '../components/header';
import SubHeader from '../components/subheader';

const FaqForm = ({
  initial = {},
  buttons,
  formProps,
  disabled,
  title
}) => {
  const [ lang, setLang ] = useState(LANGS.RU)
  const { register, handleSubmit, formState } = useForm();

  const { onSubmit, ...restFormProps } = formProps;
  const date = initial.date || new Date();

  return (
    <Layout>
      <Header>{title}</Header>
      <SubHeader
        date={date}
        setLang={setLang}
        activeLang={lang}
      />
      <Form onSubmit={handleSubmit(onSubmit)} {...restFormProps}>
        <Input 
          name='title'
          label='title'
          disabled={disabled}
          placeholder='Enter FAQ title'
          inputRef={register({ required: true })}
          defaultValue={initial.title} />
        <Input 
          name='text'
          label='text'
          disabled={disabled}
          placeholder='Enter FAQ text'
          inputRef={register({ required: true })}
          defaultValue={initial.text}
          multiline />
        <Buttons justifyContent='center' fullWidth>
          { buttons(formState) }
        </Buttons>
      </Form>
    </Layout>
  )
}

const Buttons = styled(Container)`
  button:not(:last-of-type) {
    margin-right: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  > div:first-of-type {
    margin-top: 40px;
  }
`;

export default FaqForm;
