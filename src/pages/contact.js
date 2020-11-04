import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Container from '../components/container/container';
import ContentWrapper from '../components/contentWrapper/contentWrapper';
import Layout from '../components/layout/layout';
import Button from '../components/button/button';
import TelegramIcon from '../assets/icons/telegram-btn.svg';
import WhatsupIcon from '../assets/icons/whatsup-btn.svg';
import MessangerIcon from '../assets/icons/messanger-btn.svg';
import Input from '../components/input/input';
import { BREAKPOINTS, $maxWidth } from '../theme';
import SOCIAL_LINKS from '../constants/socialLinks';

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    errors
  } = useForm();

  const submitHandler = data => console.log('data: ', data); 
  const socialClickHandler = link => () => window.open(link);

  return (
    <Layout>
      <Container fullWidth>
        <StyledWrapper direction='column' alignItems='center'>
          <Header>Если у Вас остались вопросы?</Header>
          <SubHeader>( Do you have any questions? )</SubHeader>
          <Buttons justifyContent='space-around' fullWidth>
            <ButtonWrapper direction='column'>
              <SocialButton onClick={socialClickHandler(SOCIAL_LINKS.TELEGRAM)}>
                <img src={TelegramIcon} alt='' />
              </SocialButton>
              <Caption>Подписаться на канал</Caption>
            </ButtonWrapper>
            <ButtonWrapper direction='column'>
              <SocialButton onClick={socialClickHandler(SOCIAL_LINKS.WHATS_UP)}>
                <img src={WhatsupIcon} alt='' />
              </SocialButton>
              <Caption>Ответы на Русском</Caption>
            </ButtonWrapper>
            <ButtonWrapper direction='column'>
              <SocialButton onClick={socialClickHandler(SOCIAL_LINKS.MESSENGER)}>
                <img src={MessangerIcon} alt='' />
              </SocialButton>
              <Caption>Answers in English</Caption>
            </ButtonWrapper>
          </Buttons>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <FormTitle>Cвяжитесь со мной,<br /> буду рада вам помочь!</FormTitle>
            <Input
              name='email'
              type='text'
              placeholder='example@email.com'
              label='Почта'
              inputRef={register({ required: true })}
              error={'email' in errors}
            />
            <Input
              name='message'
              placeholder='Напиши свое сообщение'
              label='Сообщение'
              type='text'
              inputRef={register({ required: true })}
              error={'message' in errors}
            />
            <SubmitButton type='submit'>отправить</SubmitButton>
          </Form>
        </StyledWrapper>
      </Container>
    </Layout>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${ $maxWidth(BREAKPOINTS.TABLE, `padding: 0 10px;`)}
`;

const SubmitButton = styled(Button)`
  margin-top: 64px;
`

const Buttons = styled(Container)`
  margin-bottom: 64px;
  overflow: hidden;
`;

const ButtonWrapper = styled(Container)`
  /* max-width: 98px; */
  align-items: center;
  /* ${ $maxWidth(BREAKPOINTS.TABLET, `max-width: 68px;`)} */
`;

const Caption = styled.p`
  font-size: 14px;
  line-height: 24px;
  padding: 0 5px;
  color: ${({ theme }) => theme.text.default};
`;

const StyledWrapper = styled(ContentWrapper)`
  max-width: 513px;
  padding: 10px 10px 64px;
  ${ $maxWidth(BREAKPOINTS.TABLET, `padding: 10px 45px 64px;`)}
  text-align: center;
`;

const Header = styled.h1`
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 60px;
  line-height: 60px;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.text.lighter2};
`;

const SubHeader = styled.h2`
  font-size: 14px;
  line-height: 34px;
  margin: 0 0 64px;
  color: ${({ theme }) => theme.text.lighter2};
`;

const SocialButton = styled.button`
  margin: 0 0 12px 0;
  padding: 0;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: #94949400;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #94949466;
  }
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    img {
      width: 68px;
      height: 68px;
    }
  `) }

`;

const FormTitle = styled.h2`
  font-family: Cormorant Infant;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  margin: 0 0 64px;
  color: ${({ theme }) => theme.text.default};
`;

export default Contact;
