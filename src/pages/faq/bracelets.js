import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Layout from '../../components/layout/faqLayout';
import ExpansionPanel from '../../components/expansionPanel/expansionPanel';
import { faqLinks } from '../../constants/links';
import loadFAQs from '../../HOCs/loadFAQs';
import Container from '../../components/container/container';
import { useLocalization } from '../../hooks/useLocalization';
import { useFaqLinks } from '../../hooks/useFaqLilnks';

const Bracelets = ({ data, links }) => {
  return (
    <Layout title='Вопросы' tabs={links}>
        <StyledContainer alignItems='center' direction='column' fullWidth>
          {
            data.map(({ title, text }, i) => (
              <ExpansionPanel key={i} title={title} text={text} />
            ))
          }
        </StyledContainer>
    </Layout>
  );
}

const StyledContainer = styled(Container)`
  padding: 0 40px;
  box-sizing: border-box;
`;

export default loadFAQs(
  connect(
    ({ content: { faq: { bracelets }}}) => ({
      data: bracelets
    }),
    null
  )(Bracelets)
);
