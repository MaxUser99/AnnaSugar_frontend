import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout/faqLayout';
import ExpansionPanel from '../../components/expansionPanel/expansionPanel';
import { faqLinks } from '../../constants/links';
import FAQ_CATEGORIES from '../../constants/FAQs';
import loadFAQs from '../../HOCs/loadFAQs';

const Astro = ({ data }) => (
  <Layout title='Вопросы' tabs={faqLinks}>
    {
      data.map(({ title, text }, i) => (
        <ExpansionPanel key={i} title={title} text={text} />
      ))
    }
  </Layout>
);

export default loadFAQs(
  connect(
    ({ content: { faq: { astro }}}) => ({
      data: astro
    }),
    null
  )(Astro)
);
