import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Container from '../components/container/container';
import ContentWrapper from '../components/contentWrapper/contentWrapper';
import Layout from '../components/layout/layout';
import Input from '../components/input/input';
import Button from '../components/button/button';
import SocialButton from '../components/socialButton/socialButton';

import TelegramIcon from '../assets/icons/telegram-btn.svg';
import WhatsupIcon from '../assets/icons/whatsup-btn.svg';
import MessangerIcon from '../assets/icons/messanger-btn.svg';

import { BREAKPOINTS, $maxWidth, $minWidth } from '../theme';
import { useLocalization } from '../hooks/useLocalization';
import SOCIAL_LINKS from '../constants/socialLinks';
import LANGS from '../constants/langs';
import { postMessage } from '../store/user/actions';

const SUCCESS_MESSAGE = 'success_message';
const ERROR_MESSAGE = 'error_message';

const Contact = () => {
  const dispatch = useDispatch();
  const [ message, setMessage ] = useState();
  const [ isLoading, setLoading ] = useState(false);
  const { t, lang } = useLocalization();
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { isDirty }
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);
    const success = await dispatch(postMessage(data));
    setLoading(false);

    reset();

    const newMessage = success
      ? SUCCESS_MESSAGE
      : ERROR_MESSAGE;
    setMessage(newMessage);
  }

  const socialClickHandler = link => () => window.open(link);

  useEffect(() => {
    if (isDirty) setMessage();
  }, [ isDirty ]);

  return (
    <StyledLayout>
      <Container fullWidth>
        <StyledWrapper direction='column' alignItems='center'>
          <Header>{t('Do you have any questions?')}</Header>
          {
            lang === LANGS.RU &&
            <SubHeader>( Do you have any questions? )</SubHeader>
          }
          <Buttons justifyContent='space-around' fullWidth>
            <ButtonWrapper direction='column'>
              <SocialButton
                onClick={socialClickHandler(SOCIAL_LINKS.TELEGRAM)}
                img={TelegramIcon}
              />
              <Caption>{t('Подписаться на канал')}</Caption>
            </ButtonWrapper>
            <ButtonWrapper direction='column'>
              <SocialButton
                onClick={socialClickHandler(SOCIAL_LINKS.WHATS_UP)}
                img={WhatsupIcon}
              />
              <Caption>{t('Связаться')}</Caption>
            </ButtonWrapper>
            <ButtonWrapper direction='column'>
              <SocialButton
                onClick={socialClickHandler(SOCIAL_LINKS.MESSENGER)}
                img={MessangerIcon}
              />
              <Caption>Answers in English</Caption>
            </ButtonWrapper>
          </Buttons>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <FormTitle>{t('Cвяжитесь со мной')},<br /> {t('буду рада вам помочь')}!</FormTitle>
            <Input
              name='email'
              type='text'
              placeholder='example@email.com'
              label={t('Почта')}
              inputRef={register({ required: true })}
              error={'email' in errors}
            />
            <Input
              name='message'
              placeholder={t('Напиши свое сообщение')}
              label={t('Сообщение')}
              type='text'
              inputRef={register({ required: true })}
              error={'message' in errors}
            />
            <AnimationContainer>
              <Message $show={!!message} $error={message === ERROR_MESSAGE}>{t(message)}</Message>
              <SubmitButton $show={!message} type='submit' disabled={isLoading}>
                { t('отправить') }
              </SubmitButton>
            </AnimationContainer>
          </Form>
        </StyledWrapper>
      </Container>
    </StyledLayout>
  );
};

const Message = styled.p`
  line-height: 64px;
  margin: 0;
  padding: 0;
  font-size: 24px;
  position: absolute;
  transition: 0.3s 0.3s;
  opacity: 1;
  ${ ({ $show }) => !$show && `
    transition: 0.3s;
    opacity: 0;
  `}
  ${ $minWidth(BREAKPOINTS.TABLET, 'white-space: nowrap;')}
`;

const SubmitButton = styled(Button)`
  transition: 0.3s 0.3s;
  position: absolute;
  opacity: 1;
  ${ ({ $show }) => !$show && `
    transition: 0.3s;
    opacity: 0;
  `}
  :disabled {
    background-color: #aaa;
  }
`

const AnimationContainer = styled(Container)`
  width: 100%;
  height: 64px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledLayout = styled(Layout)`
  #default-fab {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${ $maxWidth(BREAKPOINTS.TABLE, `padding: 0 10px;`)}
  > *:last-of-type {
    margin-top: 64px;
  }
`;

const Buttons = styled(Container)`
  margin-bottom: 64px;
  margin-top: 64px;
  overflow: hidden;
`;

const ButtonWrapper = styled(Container)`
  align-items: center;
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
  color: ${({ theme }) => theme.text.lighter2};
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
