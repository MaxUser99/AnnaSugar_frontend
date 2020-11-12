import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, navigate } from '@reach/router';

import ContentWrapper from '../contentWrapper/contentWrapper';
import Container from '../container/container';
import Link from './components/link';
import LangButton from '../langButton/langButton';
import MenuButton from './components/menuButton';

import LANGS from '../../constants/langs';
import { BREAKPOINTS, $maxWidth } from '../../theme';
import { userLinks } from '../../constants/links';
import { useLocalization } from '../../hooks/useLocalization';

const HIDDEN_LINKS = {
  [LANGS.RU]: [],
  [LANGS.EN]: ['consult', 'blog']
}

const Header = () => {
  const { pathname } = useLocation();
  const { t, lang } = useLocalization();
  console.log('pathname: ', pathname)

  useEffect(() => {
    const condition = HIDDEN_LINKS[lang].some(x => pathname.includes(x));
    console.log('pathname: ', condition, pathname)

    if (condition) {
      console.log('navigate')
      navigate('/');
    }
  }, [pathname, lang]);

  return (
    <RootContainer id='header' alignItems='center' fullWidth>
      <StyledContentWrapper justifyContent='space-between' alignItems='center' maxWidth='wide'>
        <FixedWidthContainer>
          <SiteTitle>Anna Sugar</SiteTitle>
        </FixedWidthContainer>
        <LinksContainer justifyContent='center'>
          {
            userLinks.map(({ href, title, isActive }) => (
              !HIDDEN_LINKS[lang].some(x => href.includes(x)) &&
              <StyledLink
                key={href}
                active={isActive(pathname)}
                to={href}>
                  {t(title)}
              </StyledLink>
            ))
          }
        </LinksContainer>
        <FixedWidthContainer $hidden justifyContent='flex-end'>
          <LangButton lang={LANGS.RU} />
          <LangButton lang={LANGS.EN} />
        </FixedWidthContainer>
        <MenuButton />
      </StyledContentWrapper>
    </RootContainer>
  );
}

const StyledContentWrapper = styled(ContentWrapper)`
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `padding: 0 95px 0 64px;`)}
  ${ $maxWidth(BREAKPOINTS.TABLET, `padding: 0 45px 0 46px;`)}
`;

const LinksContainer = styled(Container)`
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `display: none;`)}
`;

const StyledLink = styled(Link)`
  transition: 0.3s;
  :hover {
    color: ${({ theme }) => theme.text.mutted};
  }
`;

const RootContainer = styled(Container)`
  height: 100px;
`;

const FixedWidthContainer = styled(Container)`
  width: 11.25rem;
  min-width: 64px;
  ${({ $hidden }) => $hidden && $maxWidth(BREAKPOINTS.DESCTOP, `display: none;`) }
`;

const SiteTitle = styled.h2`
  white-space: nowrap;
  font-family: "Cormorant Infant";
`;

export default Header;
