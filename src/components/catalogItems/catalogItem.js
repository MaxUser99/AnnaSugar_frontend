import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Container from '../container/container';
import CartIcon from '../../assets/icons/cart.inline.svg';
import Price from '../price/price';
import { BREAKPOINTS, $maxWidth, $minWidth } from '../../theme';
import Button from '../button/button';

const CatalogItem = ({ item, onClick }) => {
  const { id, images, name, brief, price } = item;
  const [ imageLoaded, setImageLoaded ] = useState(false);

  const imageLoadHandler = () => setImageLoaded(true);
  const nameClickHandler = () => onClick(item);

  return (
    <Wrapper
      alignItems='stretch'
      fullWidth>
      <ImageWrapper imageLoaded={imageLoaded}>
        <img onLoad={imageLoadHandler} src={`/${images[0]}`} alt='' />
      </ImageWrapper>
      <Content alignItems='stretch' direction='column' fullWidth>
        <Name onClick={nameClickHandler} to={`${id}`}>{name}</Name>
        <Brief>{brief}</Brief>
        <Purchase alignItems='center' justifyContent='space-between' fullWidth>
          <Price>{price}</Price>
          {/* <Button>
            <CartIcon />
            <span>Консультация</span>
          </Button> */}
          <StyledButton>Заказать</StyledButton>
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

const ImageWrapper = styled(Container)`
  width: 100%;

  max-width: 340px;
  max-height: 340px;

  ${
    $maxWidth(BREAKPOINTS.DESCTOP, `
      max-width: 240px;
      max-height: 240px;
    `)
  }
  ${
    $maxWidth(BREAKPOINTS.TABLET, `
      justify-content: center;
      max-width: none;
      max-height: none;
    `)
  }
  & > img {
    /* max-width: 100%;
    max-height: 100%; */
    /* width: 100%; */
    width: 340px;
    height: 340px;
    ${
      $maxWidth(BREAKPOINTS.DESCTOP, `
        width: 240px;
        height: 240px;
      `)
    }
    ${
      $maxWidth(BREAKPOINTS.TABLET, `
        width: 285px;
        height: 240px;
      `)
    }
  }
  ${({ imageLoaded }) => !imageLoaded && 'min-height: 300px;'}
`;

const Content = styled(Container)`
  max-width: 464px;
  margin-left: 110px;
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
