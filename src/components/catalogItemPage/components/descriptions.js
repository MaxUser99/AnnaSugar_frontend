import React from 'react';
import styled from 'styled-components';
import Container from '../../container/container';

const Description = () => (
  <Container direction='column' fullWidth>
    <SubHeader>Описание:</SubHeader>
    <Text>
      Ароматические свечи в жестяных баночках с минералами/кристаллами и сухоцветами.
      Прекрасно дополнят любой интерьер, а также послужат красивым подарком.
    </Text>
    <SubHeader>Описание:</SubHeader>
    <Text>
      Верховная Жрица -  глубокий цветочный аромат с нотками лаванды
      Влюбленные – Сладкий , терпкий с ароматами ванили и пачули
      Солнце – передает теплое настроение с помощью аромата цитруса и корицы
      Луна – ароматы лотоса , сирени и легкий еле уловимый холодок
      Дьявол – Роза, амбра,, перец и чуть-чуть афродизиака
      Отшельник – сложный древесный аромат кедра и шалфея
    </Text>
    <SubHeader>Доставка:</SubHeader>
    <Text>Доставка по всему миру.</Text>
  </Container>
);

const SubHeader = styled.h4`
  margin: 0 0 19px 0;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text.lighter2};
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 36px;
  color: ${({ theme }) => theme.color.black};

  &:not(:last-of-type) {
    margin-bottom: 32px;
  }
`;

export default Description;
