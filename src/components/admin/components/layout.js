import React from 'react';
import styled from 'styled-components';
import { Link as BrowserLink } from 'gatsby';
import { adminLinks } from '../../../constants/links';
import Container from '../../container/container';
import LogOutIcon from '../../../assets/icons/logout.svg';
import Button from '../../button/button';
import ContentWrapper from '../../contentWrapper/contentWrapper';
import Dropdown from './dropdown';

const Layout = ({ children }) => (
  <StyledContainer direction='column'>
    <ContentWrapper maxWidth='wide'>
      <Header direction='column' fullWidth>
        <Container justifyContent='space-between' alignItems='center' fullWidth>
          <Logo>Anna Sugar</Logo>
          <Title>Admin Page</Title>
          <LogOutContainer justifyContent='flex-end'>
            <StyledButton outlined>
              <img src={LogOutIcon} alt='' />
            </StyledButton>
          </LogOutContainer>
        </Container>
        <Nav>
          {
            adminLinks.map(x => (
              x.subLinks
              ? <Dropdown key={x.href} value={x} />
              : <Link to={`/admin/${x.href}`} key={x.href}>{x.title}</Link>
            ))
          }
        </Nav>
      </Header>
    </ContentWrapper>
    <StyledContentWrapper direction='column'>
      { children }
    </StyledContentWrapper>
  </StyledContainer>
);

const StyledContentWrapper = styled(ContentWrapper)`
  position: relative;
`;

const Link = styled(BrowserLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > * {
    margin: 0 10px;
  }
`;

const StyledButton = styled(Button)`
  width: auto;
  height: auto;
  padding: 7px 8px;
  border: 1px solid transparent;
  box-shadow: none;
  & > img {
    width: 18px;
    height: 18px;
  }
  &:hover {
    border: 1px solid black;
    background-color: transparent;
  }
`;

const StyledContainer = styled(Container)`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.color.beige};
  padding-bottom: 100px;
  box-sizing: border-box;
`;

const Header = styled(Container)``;

const Logo = styled.h2`
  width: 150px;
`;

const Title = styled.h1`
`;

const LogOutContainer = styled(Container)`
  width: 150px;
`;

export default Layout;
