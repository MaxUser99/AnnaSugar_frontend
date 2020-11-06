import React from 'react';
import styled from 'styled-components';
import Container from '../components/container/container';
import ContentWrapper from '../components/contentWrapper/contentWrapper';
import Layout from '../components/layout/layout';
import { useLocalization } from '../hooks/useLocalization';

const Terms = () => {
  const { t } = useLocalization();

  return (
    <Layout>
      <Container justifyContent='center' fullWidth>
        <ContentWrapper direction='column' fullWidth>
          <Title>{t('Условия сотрудничества')}</Title>
          <Subheader>{t('terms.subheader1')}</Subheader>
          <Text>{t('terms.text1')}</Text>
          <Subheader>{t('terms.subheader2')}</Subheader>
          <Text>{t('terms.text2')}</Text>
        </ContentWrapper>
      </Container>
    </Layout>
  );
}

const Title = styled.h2`
  margin: 26px 0 32px;
  font-size: 48px;
  text-align: center;
  width: 100%;
  font-family: 'Cormorant Infant';
`;

const Subheader = styled.h3`
  font-family: 'Cormorant Infant';
  font-size: 24px;
  margin: 0 0 20px;
`;

const Text = styled.p`
  margin: 0 0 32px;
  line-height: 24px;
  white-space: pre-line;
  :last-of-type {
    margin-bottom: 64px;
  }
`;

export default Terms;
