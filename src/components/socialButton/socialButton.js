import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS, $maxWidth } from '../../theme';

const SocialButton = ({ className, onClick, img }) => (
  <Button className={className} onClick={onClick}>
    <img src={img} alt='' />
  </Button>
);

const Button = styled.button`
  margin: 0 0 12px 0;
  padding: 0;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: #94949400;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #94949466;
  }
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    img {
      width: 68px;
      height: 68px;
    }
  `) }
`;

export default SocialButton;
