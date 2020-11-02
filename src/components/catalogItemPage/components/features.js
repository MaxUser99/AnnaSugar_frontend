import React from 'react';
import styled from 'styled-components';
import Container from '../../container/container';

const Features = () => (
  <Container direction='column' fullWidth>
    <SubHeader>Что входит:</SubHeader>
    <Text>
      Соевый воск, пчелиный воск, натуральные эфирные масла, травы, сухоцветы, минералы и кристаллы.<br />
      Фитиль - хлопок<br />
      Объем: 90мл (12 часов горения) и 118мл (около 20 часов горения)<br />
      Жестяная баночка и стекло в зависимости от объема свечи<br />
      Может быть индивидуальная непереносимость некоторых компонентов!<br />
    </Text>
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

export default Features;
