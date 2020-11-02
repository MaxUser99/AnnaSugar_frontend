import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import { useForm } from 'react-hook-form';
import Container from '../container/container';
import ContentWrapper from '../contentWrapper/contentWrapper';
import Input from '../input/input';
import Button from '../button/button';

const Login = ({ isLoggedIn }) => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => console.log(data);

  if (isLoggedIn) return <Redirect to='/admin' noThrow/>;

  return (
    <StyledContainer fullWidth>
      <ContentWrapper justifyContent='center' maxWidth='none'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Пожалуйста введите логин и пароль чтобы войти</Title>
          <StyledInput
            label='email'
            name='login'
            type='text'
            placeholder='example@email.com'
            inputRef={register({ required: true })}
            error={'login' in errors}
          />
          <StyledInput
            label='password'
            name='password'
            type='password'
            placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
            inputRef={register({ required: true })}
            error={'password' in errors}
          />
          <Button type='submit'>Войти</Button>
        </Form>
      </ContentWrapper>
    </StyledContainer>
  );
}

const StyledInput = styled(Input)`
  box-sizing: border-box;
  padding: 0 60px;
  &:last-of-type {
    margin-bottom: 64px;
  }
`;

const StyledContainer = styled(Container)`
  min-height: 100vh;
  width: 500px;
  margin: auto;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px 0;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  margin: 0 0 64px;
`;

export default connect(({ userData: { user } }) => ({
  isLoggedIn: !!user
}))(Login);
