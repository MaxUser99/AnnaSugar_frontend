import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../../components/layout/layout';

const CatalogRoot = () => {

  useEffect(() => {
    navigate('bracelets');
  }, []);

  return <Layout />;
};

export default CatalogRoot;
