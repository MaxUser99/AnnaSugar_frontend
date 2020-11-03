import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Tab = ({ children, href }) => (
  <TabItem as={Link} activeClassName='active' to={`../${href}`}>
    { children }
  </TabItem>
);

const TabItem = styled(Link)`
  box-sizing: border-box;
  white-space: nowrap;
  border-radius: 0;
  padding: 20px 36px;
  box-shadow: none;
  color: black;
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  background-color: transparent;
  width: 50%;
  text-decoration: none;
  transition: 0.3s;
  color: ${({ theme }) => theme.text.mutted};
  &.active {
    color: ${({ theme }) => theme.text.header};
    background-color: ${({ theme }) => theme.color.beige};
  }
  &:hover {
    background-color: #E5E3DC;
    color: ${({ theme }) => theme.text.header};
  }
`;

export default Tab;
