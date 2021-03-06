import React from 'react';
import styled from 'styled-components';
import Container from '../container/container';
import ContentWrapper from '../contentWrapper/contentWrapper';
import Button from '../button/button';
import InstaIcon from '../../assets/icons/instagram.inline.svg';
import { BREAKPOINTS, $maxWidth, $minWidth } from '../../theme';
import SOCIAL_LINKS from '../../constants/socialLinks';
import { useLocalization } from '../../hooks/useLocalization';
import { navigate } from 'gatsby';

const Footer = () => {
  const { t } = useLocalization();

  const subscribeCLickHandler = () => window.open(SOCIAL_LINKS.TELEGRAM);

  const subInstagram = () => window.open(SOCIAL_LINKS.INSTAGRAM);

  const termsClickHandler = () => navigate('/terms');

  return (
    <AbsoluteBlock id='footer'>
      <Block1 fullWidth>
        <ContentWrapper direction='column' alignItems='center'>
          <Header>{t('Хочешь узнавать обо всем первым?')}</Header>
          <Button onClick={subscribeCLickHandler} outlined>{t('subscribe')}</Button>
        </ContentWrapper>
      </Block1>
      <Block2 fullWidth>
        {/* default footer */}
        <StyledContentWrapper
          $hideUntill={BREAKPOINTS.TABLET}
          maxWidth='wide'
          justifyContent='space-between'
          alignItems='center'>
          <FooterItem>
            <Text>Anna Sugar&copy;</Text>
          </FooterItem>
          <FooterItem justifyContent='center'>
            <Text>All rights reserved</Text>
          </FooterItem>
          <FooterItem justifyContent='center'>
            <Text onClick={termsClickHandler}>{t('Условия сотрудничества')}</Text>
          </FooterItem>
          <FooterItem alignItems='center' justifyContent='flex-end'>
            <SocialButton onClick={subInstagram}>
              <InstaIcon />
            </SocialButton>
          </FooterItem>
        </StyledContentWrapper>

        {/* mobile footer */}
        <StyledContentWrapper
          $hideAfter={BREAKPOINTS.TABLET}
          maxWidth='wide'
          direction='column'>
            <MobileWrapper justifyContent='center' fullWidth>
              <Text>Anna Sugar&copy;</Text>
            </MobileWrapper>
            <MobileWrapper justifyContent='center' fullWidth>
              <Text>All rights reserved</Text>
            </MobileWrapper>
            <MobileWrapper justifyContent='center' fullWidth>
              <Text onClick={termsClickHandler}>{t('Условия сотрудничества')}</Text>
            </MobileWrapper>
          </StyledContentWrapper>
      </Block2>
    </AbsoluteBlock>
  );
}

const MobileWrapper = styled(Container)`
  :not(:last-of-type) {
    margin-bottom: 12px;
  }
  ${ $maxWidth(BREAKPOINTS.MOBILE, 'justify-content: center;')}
`;

const AbsoluteBlock = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const FooterItem = styled(Container)`
  /* width: 130px; */
`;

const Block1 = styled(Container)`
  background-color: ${({ theme }) => theme.color.darkBeige};
  padding: 64px 0;
  // margin-top: auto;
`;

const Block2 = styled(Container)`
  // padding: 26px 122px 39px;
padding: 26px 0 39px;
`;

const StyledContentWrapper = styled(ContentWrapper)`
  padding: 0 122px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'padding: 0 88px;')}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'padding: 0 45px;')}
  ${ ({ $hideUntill }) => ( $hideUntill && $maxWidth($hideUntill, 'display: none;') ) }
  ${ ({ $hideAfter }) => ( $hideAfter && $minWidth($hideAfter, 'display: none;') ) }
`;

const Header = styled.h2`
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  margin: 0 0 32px;
  text-align: center;
  font-family: "Cormorant Infant";
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 48px;
  margin: 0;
  white-space: nowrap;
  // line-height: 14px;
  color: ${({ theme }) => theme.text.lighter2};
  ${ ({ onClick }) => !!onClick && `
    cursor: pointer;
    transition: 0.3s;
    :hover {
      opacity: 0.7;
    }
  `}
`;

const SocialButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0 6px;
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid black;
  cursor: pointer;
  transition: 0.3s;
  path {
    fill: black;
  }
  :hover {
    background: black;
    path {
      fill: white;
    }
  }
  ${ $maxWidth(BREAKPOINTS.MOBILE, 'display: none;')}
`;

export default Footer;
