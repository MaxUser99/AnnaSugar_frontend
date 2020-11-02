import React from 'react';
import styled from 'styled-components';
import Container from '../../../container/container';
import LangButton from '../../../header/components/langButton';
import LANGS from '../../../../constants/langs';

const SubHeader = ({
  date,
  setLang,
  activeLang
}) => (
  <Root justifyContent='space-between' fullWidth>
    <Date>{date.toString()}</Date>
    <Container>
      <LangButton
        onClick={() => setLang(LANGS.RU)}
        active={activeLang === LANGS.RU}
        lang={LANGS.RU}
      />
      <LangButton
        onClick={() => setLang(LANGS.EN)}
        active={activeLang === LANGS.EN}
        lang={LANGS.EN}
      />
    </Container>
  </Root>
)

const Root = styled(Container)`
  border-bottom: 1px solid black;
  padding-bottom: 16px;
`;

const Date = styled.p``;

export default SubHeader;
