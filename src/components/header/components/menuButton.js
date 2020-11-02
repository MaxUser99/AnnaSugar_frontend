import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import MenuIcon from '../../../assets/icons/menu.svg';
import { BREAKPOINTS, $minWidth } from '../../../theme';
import Nav from './nav';

const MenuButton = () => {
  const [ root, setRoot ] = useState();
  const [ isOpen, setOpen ] = useState(false);

  useEffect(() => {
    setRoot(document.getElementById('root'));
  }, []);

  const toggleOpen = () => setOpen(prev => !prev);

  return (
    <Button onClick={toggleOpen}>
      <img src={MenuIcon} alt='' />
      {
        root && ReactDOM.createPortal(
          <Nav open={isOpen} setOpen={setOpen} />,
          root
        )
      }
    </Button>
  )
}

const Button = styled.button`
  background: transparent;
  /* background: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  padding: 0;
  outline: none;
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
  ${$minWidth(BREAKPOINTS.DESCTOP, 'display: none;')}
`;

export default MenuButton;
