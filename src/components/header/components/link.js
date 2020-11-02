import React from 'react';
import styled from 'styled-components';
import { Link as BrowserLink } from 'gatsby';

const Link = ({ active, ...props }) => (
  <StyledLink $active={active} {...props} />
);

const StyledLink = styled(BrowserLink)`
  // margin: 0 0.625rem;
  margin: 0 24px;
  text-decoration: none;
  text-outline: none;
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme, $active }) => (
    $active
    ? theme.text.mutted
    : theme.text.lighter2
  )};
  // &.active {
  //   color: ${({ theme }) => theme.text.mutted};
  // }
`;

export default Link;
