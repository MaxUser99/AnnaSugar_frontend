import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout/faqLayout';
import ExpansionPanel from '../../components/expansionPanel/expansionPanel';
import loadFAQs from '../../HOCs/loadFAQs';
import { useFaqLinks } from '../../hooks/useFaqLilnks';

const Bars = ({ data, links }) => {
  return (
    <Layout title='Вопросы' tabs={links}>
      {
        data.map(({ title, text }, i) => (
          <ExpansionPanel key={i} title={title} text={text} />
        ))
      }
    </Layout>
  );
}

export default loadFAQs(
  connect(
    ({ content: { faq: { bars }}}) => ({
      data: bars
    }),
    null
  )(Bars)
);
