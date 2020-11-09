import React from 'react';
import styled from 'styled-components';
import Container from '../../container/container';
import Carousel from './Carousel';
import Button from '../../button/button';
import Price from '../../price/price';
import { BREAKPOINTS, $maxWidth, $minWidth } from '../../../theme';
import SOCIAL_LINKS from '../../../constants/socialLinks';
import { useLocalization } from '../../../hooks/useLocalization';

const propGetter = (obj, propName, placeholder = '-') => (obj && obj[propName]) ? obj[propName] : placeholder;

const ItemPage = ({ item, isLoading }) => {
  const { t } = useLocalization();
  const name = propGetter(item, 'name');
  const compound = propGetter(item, 'compound');
  const images = propGetter(item, 'images', []);
  const price = propGetter(item, 'price', null);
  
  const offerClickHandler = () => window.open(SOCIAL_LINKS.WHATS_UP);

  return (
    <RootContainer alignItems='stretch' justifyContent='flex-start' fullWidth>
      <Carousel images={images} />
      <Content direction='column' fullWidth>
        <Name $loading={isLoading}>{name}</Name>
        <Label>{t('Состав')}</Label>
        <Compound>{compound}</Compound>
        <Label>{t('Цена')}</Label>
        <Price>{price}</Price>
        <Button onClick={offerClickHandler}>{t('Заказать')}</Button>
      </Content>
    </RootContainer>
  );
};

const RootContainer = styled(Container)`
  padding-top: 36px;
  ${ $maxWidth(BREAKPOINTS.TABLET, 'flex-direction: column;')}
`;

const Content = styled(Container)`
  max-width: 464px;
  padding-left: 100px;
  /* ${ $minWidth(BREAKPOINTS.DESCTOP, `max-height: 390px;`)} */
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `padding-left: 64px;`)}
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    padding-left: 0;
    margin-top: 32px;
  `)}
  & > button {
    margin-top: auto;
    ${ $maxWidth(BREAKPOINTS.TABLET, `width: 100%;`)}
  }
`;

const Name = styled.h2`
  font-family: ${({ $loading }) => !$loading && "Cormorant Infant"};
  // font-family: ;
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  margin: 0 0 32px;
  color: ${({ theme }) => theme.text.lighter2};
`;

const Label = styled.p`
  font-size: 14px;
  line-height: 14px;
  margin: 0 0 5px;
  color: ${({ theme }) => theme.text.mutted};
`;

const Compound = styled.p`
  font-size: 18px;
  line-height: 32px;
  max-height: 128px;
  overflow: hidden;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.text.lighter2};
`;

export default ItemPage;
