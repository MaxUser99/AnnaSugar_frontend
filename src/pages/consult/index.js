import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { consultLinks } from '../../constants/links';
import Layout from '../../components/layout/layout';

const ConsultIndex = () => {
  useEffect(() => {
    navigate(consultLinks[0].href);
  }, []);

  return <Layout title='Консультации' />;
}

export default ConsultIndex;
