import React from 'react';
import styled from 'styled-components';
import { useFooterHeight } from '../../hooks/useFooterHeight';
import Header from '../header/header';
import Footer from '../footer/footer';
import Container from '../container/container';
import ImageModal from '../ImageModal/imageModal';

const Layout = ({ className, children }) => {
  const footerHeight = useFooterHeight();
  return (
    <StyledContainer
      id='root'
      $footerHeight={footerHeight}
      className={className}
      direction='column'>
        <ImageModal />
        <Header />
          { children}
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

export default Layout;
