import React, { useRef, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import LangButton from '../../langButton/langButton';
import Container from '../../container/container';
import { default as BaseSocialButton } from '../../socialButton/socialButton';

import CloseIcon from '../../../assets/icons/close.inline.svg';
import TelegramIcon from '../../../assets/icons/telegram-btn.svg';
import WhatsupIcon from '../../../assets/icons/whatsup-btn.svg';
import MessangerIcon from '../../../assets/icons/messanger-btn.svg';

import { useLocalization } from '../../../hooks/useLocalization';
import { userLinks, HIDDEN_LINKS } from '../../../constants/links';
import LANGS from '../../../constants/langs';
import SOCIAL_LINKS from '../../../constants/socialLinks';

const Nav = ({ open, setOpen }) => {
  const menuRef = useRef();
  const { t, lang } = useLocalization();

  useEffect(() => {
    if (open) {
      document.addEventListener('click', closeModal);
      disableBodyScroll(menuRef.current, { reserveScrollBarGap: true });
    } else {
      document.removeEventListener('click', closeModal);
      enableBodyScroll(menuRef.current);
    }

    return () => {
      document.removeEventListener('click', closeModal);
      clearAllBodyScrollLocks();
    }
  }, [open]);

  const menuClickHandler = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  const closeModal = () => setOpen(false);
  const socialClickHandler = link => () => window.open(link);

  return (
    <>
      <Backface $open={open} />
      <Menu
        ref={menuRef}
        onClick={menuClickHandler}
        $open={open}>
          <Button onClick={closeModal}>
            <CloseIcon />
          </Button>
          {
            userLinks.map(({ href, title }) => (
              !HIDDEN_LINKS[lang].some(x => href.includes(x)) &&
              <StyledLink
                key={href}
                onClick={closeModal}
                to={href}>
                  {t(title)}
                </StyledLink>
            ))
          }
          <Container>
            <LangButton lang={LANGS.RU} />
            <LangButton lang={LANGS.EN} />
          </Container>
          <Container>
            <SocialButton
              onClick={socialClickHandler(SOCIAL_LINKS.TELEGRAM)}
              img={TelegramIcon}
            />
            <SocialButton
              onClick={socialClickHandler(SOCIAL_LINKS.WHATS_UP)}
              img={WhatsupIcon}
            />
            <SocialButton
              onClick={socialClickHandler(SOCIAL_LINKS.MESSENGER)}
              img={MessangerIcon}
            />
          </Container>
      </Menu>
    </>
  );
}

const SocialButton = styled(BaseSocialButton)`
  margin: 0 10px;
  width: 50px;
  height: 50px;
  img {
    width: 50px;
    height: 50px;
  }
`;

const Button = styled.button`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items:center;
  border: 1px solid black;
  outline: none;
  transition: 0.3s;
  cursor: pointer;
  background: transparent;
  position: absolute;
  top: 16px;
  right: 16px;
  svg {
    stroke: black;
    width: 10px;
  }
  :hover {
    opacity: 0.5;
  }
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 1px;
  text-transform: capitalize;
  min-width: 40px;
  text-align: center;
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 20px;
  position: relative;
  font-family: "Cormorant Infant";
  :hover {
    opacity: 0.5;
  }
`;

const Backface = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 390;
    background-color: black;
    opacity: 0;
    transition: 0.5s;
    ${ ({ $open }) => $open && `
      transition: 0.5s;
      width: 100%;
      height: 100%;
      opacity: 0.5;
    `}
`;

const Menu = styled.nav`
  padding-top: 120px;
  background-color: ${ ({ theme }) => theme.color.darkBeige};
  position: fixed;
  height: 100vh;
  right: 0;
  min-width: 300px;
  z-index: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: -100%;
  transition: right 0.5s;
  > div {
    margin-bottom: 20px;
  }
  > * {
    transition: opacity 1s;
    opacity: 0;
  }
  ${ ({$open }) => $open && `
    right: 0;
    > * {
      opacity: 1;
    }
  `}
  @media screen and (max-width: 520px) {
    min-width: unset;
    width: 100%;
  }
`;

export default Nav;
