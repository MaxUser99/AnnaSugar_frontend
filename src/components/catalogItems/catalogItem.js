import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Container from '../container/container';
import Price from '../price/price';
import { BREAKPOINTS, $maxWidth, $between } from '../../theme';
import Button from '../button/button';
import SOCIAL_LINKS from '../../constants/socialLinks';
import { useLocalization } from '../../hooks/useLocalization';
import Gallery from '../gallery/gallery';

const CatalogItem = ({ item, onClick }) => {
  const { id, images, name, brief, price } = item;
  const { t } = useLocalization();

  const nameClickHandler = () => onClick(item);
  const offerClickHandler = () => window.open(SOCIAL_LINKS.WHATS_UP);

  return (
    <Wrapper
      alignItems='stretch'
      fullWidth>
      <Gallery images={images} />
      <Content alignItems='stretch' direction='column' fullWidth>
        <Name onClick={nameClickHandler} to={`${id}`}>{name}</Name>
        <Brief>{brief}</Brief>
        <Purchase alignItems='center' justifyContent='space-between' fullWidth>
          <Price>{price}</Price>
          <StyledButton onClick={offerClickHandler}>{t('Заказать')}</StyledButton>
        </Purchase>
      </Content>
    </Wrapper>
  );
};

const StyledButton = styled(Button)`
  width: auto;
  height: auto;
  padding: 20px 30px;
`;

const Wrapper = styled(Container)`
  padding: 32px 0;
  &:first-of-type {
    margin-top: 32px;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #171a1e33;
    border-radius: 1px;
  }
  ${
    $maxWidth(BREAKPOINTS.TABLET, `
      flex-direction: column;
      align-items: center;
    `)
  }
`;

const Content = styled(Container)`
  max-width: 464px;
  margin-left: 110px;
  ${ $between(BREAKPOINTS.DESCTOP, BREAKPOINTS.XL, `max-width: 600px;`)}
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'margin-left: 64px;')}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'margin-left: 0;')}
`;

const Purchase = styled(Container)`
  margin-top: auto;
  flex-wrap: wrap;
`;

const Name = styled(Link)`
  font-family: "Cormorant Infant";
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  margin: 32px 0 20px;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  text-decoration: none;
  color: ${({ theme }) => theme.text.header};
  :hover {
    color: ${({ theme }) => theme.text.mutted};
  }
`;

const Brief = styled.p`
  font-size: 14px;
  line-height: 28px;
  max-height: 134px;
  overflow: hidden;
  margin: 0 0 50px;
  color: ${({ theme }) => theme.text.default};
`;

export default CatalogItem;
