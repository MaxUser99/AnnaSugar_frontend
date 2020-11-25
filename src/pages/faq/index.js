import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../../components/layout/faqLayout';
import { faqLinks } from '../../constants/links';
import { useFaqLinks } from '../../hooks/useFaqLilnks';

const FaqRoot = () => {

  const filteredLinks = useFaqLinks();

  useEffect(() => {
    navigate(filteredLinks[0].href);
  }, []);

  return <Layout title='Вопросы' tabs={filteredLinks} />;
};

export default FaqRoot;
