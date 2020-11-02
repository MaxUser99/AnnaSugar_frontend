import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Container from '../container/container';
import CartIcon from '../../assets/icons/cart.inline.svg';
import Price from '../price/price';
import { BREAKPOINTS, $maxWidth, $minWidth } from '../../theme';

const CatalogItem = ({ item, onClick }) => {
  const { id, images, name, brief, price } = item;
  const [ imageLoaded, setImageLoaded ] = useState(false);

  const imageLoadHandler = () => setImageLoaded(true);
  const nameClickHandler = () => onClick(item);

  return (
    <Wrapper
      alignItems='stretch'
      // justifyContent='space-between'
      fullWidth>
      <ImageWrapper imageLoaded={imageLoaded}>
        <img onLoad={imageLoadHandler} src={`/${images[0]}`} alt='' />
      </ImageWrapper>
      <Content alignItems='stretch' direction='column' fullWidth>
        <Name onClick={nameClickHandler} to={`${id}`}>{name}</Name>
        <Brief>{brief}</Brief>
        <Purchase alignItems='center' justifyContent='space-between' fullWidth>
          <Price>{price}</Price>
          <Button>
            <CartIcon />
            <span>Консультация</span>
          </Button>
        </Purchase>
      </Content>
    </Wrapper>
  );
};

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
    max-width: 100%;
    max-height: 100%;
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
  margin: 0;
  color: ${({ theme }) => theme.text.default};
`;

const Button = styled.button`
  margin: 0;
  padding: 0;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;

  border: 1px solid transparent;
  padding: 10px;
  border-radius: 4px;

  /* img {
    margin-right: 20px;
    ${ $maxWidth(BREAKPOINTS.DESCTOP, 'margin-right: 0;')}
  } */

  span {
    transition: 0.3s;
    /* opacity: 0.5; */
    /* color: red; */
    /* color: ${({ theme }) => theme.text.lighter2}; */
    margin-left: 20px;
    ${ $maxWidth(BREAKPOINTS.DESCTOP, 'display: none;')}
  }

  :hover {
    opacity: 0.7;
  }
`;

export default CatalogItem;
