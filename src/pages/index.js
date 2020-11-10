import React from 'react';
import styled from 'styled-components';
import MainBlock from '../components/indexComponents/mainBlock';
import Articles from '../components/indexComponents/articles';
import Layout from '../components/layout/layout';
import Reviews from '../components/indexComponents/reviews';
import { $maxWidth, BREAKPOINTS } from '../theme';

const Home = () => (
  <StyledLayout>
    <MainBlock />
    <Articles />
    <Reviews />
  </StyledLayout>
);

const StyledLayout = styled(Layout)`
  #default-fab {
    ${ $maxWidth(BREAKPOINTS.DESCTOP, 'display: none;')}
  }
`;

export default Home;
