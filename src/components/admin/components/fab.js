import React from 'react';
import styled from 'styled-components';
import PlusIcon from '../../../assets/icons/plus.inline.svg';

const Fab = props => (
  <Button {...props}>
    <PlusIcon />
  </Button>
)

const Button = styled.button`
  position: fixed;
  bottom: 100px;
  right: 220px;

  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #aaa;
  padding: 12px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: #aaa9;
  }
  svg {
    width: 24px;
  }
`;

export default Fab;