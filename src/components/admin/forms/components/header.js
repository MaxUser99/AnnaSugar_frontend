import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import Container from '../../../container/container'; 
import Button from '../../../button/button';
import backArrow from '../../../../assets/icons/back-arrow.svg';

const Header = ({ children }) => (
  <FormHeader alignItems='center' justifyContent='center' fullWidth>
    <BackButton onClick={() => navigate('../')}>
      <img src={backArrow} alt='' />
    </BackButton>
    <PageTitle>{ children }</PageTitle>
  </FormHeader>
);

const FormHeader = styled(Container)`
  position: relative;
  margin-top: 64px;
  margin-bottom: 20px;
`;

const BackButton = styled(Button)`
  position: absolute;
  left: 0;
  width: auto;
  height: auto;
  padding: 7px;
  background: transparent;
  box-shadow: none;
  border: 1px solid transparent;
  :hover {
    border-color: black;
    background-color: transparent;
  }
  img {
    width: 18px;
    height: 18px;
  }
`;

const PageTitle = styled.h3``;

export default Header;
