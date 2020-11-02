import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../../components/layout/faqLayout';
import { faqLinks } from '../../constants/links';

const FaqRoot = () => {
  useEffect(() => {
    navigate('astro');
  }, []);

  return <Layout title='Вопросы' tabs={faqLinks} />;
};

export default FaqRoot;
