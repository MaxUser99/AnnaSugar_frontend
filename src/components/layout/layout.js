import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFooterHeight } from '../../hooks/useFooterHeight';
import Header from '../header/header';
import Footer from '../footer/footer';
import Container from '../container/container';
import ImageModal from '../ImageModal/imageModal';
import { Helmet } from 'react-helmet';
import Fab from './components/fab';
import { BREAKPOINTS, $maxWidth } from '../../theme';

const Layout = ({ className, children }) => {
  const [ extraOffset, setExtraOffset ] = useState(0);
  const footerHeight = useFooterHeight();

  useEffect(() => {
    const footer = document.getElementById('footer');

    function scrollHandler() {
      if (!footer) return;

      const { top } = footer.getBoundingClientRect();

      const distance = window.innerHeight - top;
      const extraOffset = distance > 0
        ? distance
        : 0;
      setExtraOffset(extraOffset)
    }  

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <StyledContainer
      id='root'
      $footerHeight={footerHeight}
      className={className}
      direction='column'>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Anna Suggar</title>
        </Helmet>
        <ImageModal />
        <Header />
        { children}
        <StyledFab id='default-fab' $extraOffset={extraOffset} />
        <Footer />
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.color.beige};
  padding-bottom: ${({ $footerHeight }) => $footerHeight}px;
  position: relative;
  box-sizing: border-box;
`;

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 6%;
  bottom: ${ ({ $extraOffset }) => `calc(6% + ${$extraOffset}px);` };
  transition: bottom 0s,
              opacity 0.3s;
  right: 7.5%;
  z-index: 1;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `
    width: 88px;
    height: 88px;
    right: 0;
  `)}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'display: none;')};
`;

export default Layout;
