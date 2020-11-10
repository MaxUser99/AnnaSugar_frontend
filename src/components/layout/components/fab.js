import React from 'react';
import styled from 'styled-components';
import SOCIAL_LINKS from '../../../constants/socialLinks';
import FabIcon from '../../../assets/images/whatsup-fab.svg';

const Fab = React.forwardRef((props, ref) => {
  const fabClickHandler = () => window.open(SOCIAL_LINKS.WHATS_UP);

  return (
    <FabButton ref={ref} {...props} onClick={fabClickHandler}>
      <FabImg src={FabIcon} alt='' />
    </FabButton>
  );
});

// position: fixed;
// bottom: 11%;
// right: 7.5%;
// z-index: 1;
const FabButton = styled.button`
  border: none;
  border-radius: 50%;
  padding: 0;
  outline: none;
  background: transparent;
  margin-top: auto;
  width: 98px;
  height: 98px;
  cursor: pointer;
  /* ${({ $absolute }) => $absolute && `
    ${ $maxWidth(BREAKPOINTS.DESCTOP, 'display: none;') }
    position: absolute;
    // right: 3.25%;
    right: 8%;
    top: 0;
  `} */
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
`;

const FabImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default Fab;
