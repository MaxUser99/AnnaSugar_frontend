import React from 'react';
import MainBlock from '../components/indexComponents/mainBlock';
import Articles from '../components/indexComponents/articles';
import Layout from '../components/layout/layout';
import Reviews from '../components/indexComponents/reviews';

const Home = () => (
  <Layout>
    <MainBlock />
    <Articles />
    <Reviews />
  </Layout>
);

export default Home;
