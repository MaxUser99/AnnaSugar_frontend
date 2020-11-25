import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layout/faqLayout';
import ExpansionPanel from '../../components/expansionPanel/expansionPanel';
import { faqLinks } from '../../constants/links';
import FAQ_CATEGORIES from '../../constants/FAQs';
import loadFAQs from '../../HOCs/loadFAQs';
import { useFaqLinks } from '../../hooks/useFaqLilnks';

const Astro = ({ data, links }) => {
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
    ({ content: { faq: { astro }}}) => ({
      data: astro
    }),
    null
  )(Astro)
);
