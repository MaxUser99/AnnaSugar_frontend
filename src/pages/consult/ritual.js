import React from 'react';
import { connect } from 'react-redux';
import { consultLinks } from '../../constants/links';
import Layout from '../../components/layout/faqLayout';
import ConsultItem from '../../components/consultItem/consultItem';
import { consultWrapper } from './index';

const Ritual = ({ items }) => (
  <Layout title='Консультации' tabs={consultLinks}>
    {
      items.map(item => <ConsultItem key={item.title} item={item} />)
    }
  </Layout>
);

const mapStateToProps = ({ content: { ritual: { data }}}) => ({
  items: data
});

export default consultWrapper(connect(mapStateToProps)(Ritual));
