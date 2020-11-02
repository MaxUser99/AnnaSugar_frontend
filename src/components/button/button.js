import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ onClick, ...props }) => {
  const ClickHandler = (e) => {
    const ripple = document.createElement("span"); 

    e.target.appendChild(ripple); 

    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop; 

    console.log({ x, y})

    ripple.style.left = `${x}px`; 
    ripple.style.top = `${y}px`; 

    setTimeout(() => { 
        ripple.remove(); 
    }, 300);

    if (onClick) onClick(e);
  };

  return (
    <StyledButton onClick={ClickHandler} {...props} />
  );
}

const rippleAnimation = keyframes`
  from { 
    opacity: 1; 
    transform: scale(0); 
  } 
  to { 
    opacity: 0; 
    transform: scale(10); 
  } 
`;

const StyledButton = styled.button`
  width: 220px;
  height: 64px;
  border: ${({ theme, outlined }) => (outlined ? `1px solid ${theme.color.black}` : 'none')};
  background-color: ${({ theme, outlined }) => (outlined ? 'transparent' : theme.color.black)};
  color: ${({ theme, outlined }) => (outlined ? theme.text.default : theme.text.white)};
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => (`${theme.color.black}E6`)};
    color: ${({ theme }) => theme.text.white};
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }

  position: relative; 
  overflow: hidden; 

  & span {
    position: absolute; 
        border-radius: 50%; 
        /* To make it round */
        background-color: rgba(0, 0, 0, 0.3); 
  
        width: 100px; 
        height: 100px; 
        margin-top: -50px; 
        /* for positioning */
        margin-left: -50px; 
  
        animation: ripple 1s; 
        opacity: 0;
        animation-name: ${rippleAnimation};
        animation-duration: 1s;
  }
`;

Button.propTypes = {
  outlined: PropTypes.bool
};

export default Button;
