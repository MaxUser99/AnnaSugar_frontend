import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Anna Sugar</title>
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

const pulseAnimation = keyframes`
  0% {
    opacity: 0.8;
		transform: scale(0.97);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
	}

	22% {
		/* transform: scale(1); */
		box-shadow: 0 0 0 13px rgba(0, 0, 0, 0);
	}

	33% {
    opacity: 1;

		/* transform: scale(0.95); */
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
  40% {
		transform: scale(1);
    /* transform: scale(1); */
  }
`;

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 6%;
  bottom: ${ ({ $extraOffset }) => `calc(6% + ${$extraOffset}px);` };
  transition: bottom 0s,
              opacity 0.3s;
  right: 7.5%;
  z-index: 1;
  animation-delay: 1s;
  animation-name: ${pulseAnimation};
  animation-iteration-count: infinite;
  animation-duration: 5s;
  /* animation: 1s 10s infinite ${pulseAnimation}; */
  /* animation: 4s ${pulseAnimation} infinite; */
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `
    width: 88px;
    height: 88px;
    right: 0;
  `)}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'display: none;')};
`;

export default Layout;
