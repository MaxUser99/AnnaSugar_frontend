import React from 'react';
import styled from 'styled-components';
import SOCIAL_LINKS from '../../../constants/socialLinks';
import WhatsupIcon from '../../../assets/images/whatsup-fab.svg';
import MessangerIcon from '../../../assets/icons/messanger-btn.svg';
import { useLocalization } from '../../../hooks/useLocalization';
import LANGS from '../../../constants/langs';

const settings = {
  [LANGS.RU]: { icon: WhatsupIcon, link: SOCIAL_LINKS.WHATS_UP },
  [LANGS.EN]: { icon: MessangerIcon, link: SOCIAL_LINKS.WHATS_UP }
}

const Fab = React.forwardRef((props, ref) => {
  const { lang } = useLocalization();

  const { icon, link } = settings[lang];
  
  const fabClickHandler = () => window.open(link);

  return (
    <FabButton ref={ref} {...props} onClick={fabClickHandler}>
      <FabImg src={icon} alt='' />
    </FabButton>
  );
});

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
