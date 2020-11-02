import React from 'react';
import { useLocation } from '@reach/router';
import { catalogLinks } from '../../../constants/links';
import BaseBreadscrumb from '../../breadscrumb/breadscrumb';

const Breadscrumb = ({ itemName }) => {
  const { pathname } = useLocation();

  const currentRoute = catalogLinks.find(({ href }) => pathname.includes(href));

  const links = [
    { title: 'Главная', href: '/', disabled: false },
    (currentRoute && { title: currentRoute.title, href: '../', disabled: false }),
    { title: itemName, href: '#', disabled: true },
  ];

  return <BaseBreadscrumb breadscrumbs={links} />;
};

export default Breadscrumb;
