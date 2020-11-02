import React from 'react';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components';
import Login from '../components/admin/login';
import PrivateRoute from '../components/PrivateRoute/privateRoute';

import Articles from '../components/admin/subpages/articles';
import NewArticleForm from '../components/admin/forms/article/newArticleForm';
import EditArticleForm from '../components/admin/forms/article/editArticleForm';

import Reviews from '../components/admin/subpages/reviews';
import NewReviewForm from '../components/admin/forms/review/NewReviewForm';
import EditReviewForm from '../components/admin/forms/review/EditReviewForm';

import CatalogBeads from '../components/admin/subpages/catalogBeads';
import CatalogBracelets from '../components/admin/subpages/catalogBracelets';
import CatalogKindles from '../components/admin/subpages/catalogKindles';
import CatalogOthers from '../components/admin/subpages/catalogOthers';
import NewCatalogForm from '../components/admin/forms/catalog/newCatalogForm';

import ConsultAstro from '../components/admin/subpages/consultAstro';
import ConsultRituals from '../components/admin/subpages/consultRituals';
import ConsultRunes from '../components/admin/subpages/consultRunes';
import ConsultTaro from '../components/admin/subpages/consultTaro';

import FaqAstro from '../components/admin/subpages/faqAstro';
import FaqBars from '../components/admin/subpages/faqBars';
import FaqBeads from '../components/admin/subpages/faqBeads';
import FaqBracelets from '../components/admin/subpages/faqBracelets';
import EditFaqForm from '../components/admin/forms/faq/editFaqForm';
import NewFaqForm from '../components/admin/forms/faq/newFaqForm';

const Admin = () => (
  <StyledRouter basepath='/admin'>
    <Login path='/login' />
    <PrivateRoute path='/catalog/beads' component={CatalogBeads} />
    <PrivateRoute path='/catalog/bracelets' component={CatalogBracelets} />
    <PrivateRoute path='/catalog/kindles' component={CatalogKindles} />
    <PrivateRoute path='/catalog/others' component={CatalogOthers} />
    <PrivateRoute path='/consult/astro' component={ConsultAstro} />
    <PrivateRoute path='/consult/ritual' component={ConsultRituals} />
    <PrivateRoute path='/consult/rune' component={ConsultRunes} />
    <PrivateRoute path='/consult/taro' component={ConsultTaro} />
    <PrivateRoute path='/faq/astro' component={FaqAstro} />
    <PrivateRoute path='/faq/bracelets' component={FaqBracelets} />
    <PrivateRoute path='/faq/bars' component={FaqBars} />
    <PrivateRoute path='/faq/beads' component={FaqBeads} />
    <PrivateRoute path='/reviews' component={Reviews} />
    <PrivateRoute path='/articles' component={Articles} />

    {
      formsRoutes.map(({ pathnames, component }) => (
        pathnames.map(path => (
          <PrivateRoute path={path} component={component} />
        ))
      ))
    }

    <PrivateRoute path='*' component={() => <Redirect to='articles' noThrow />} />
  </StyledRouter>
);

const formsRoutes = [
  {
    pathnames: [
      '/faq/astro/new',
      '/faq/bracelets/new',
      '/faq/bars/new',
      '/faq/beads/new',
    ],
    component: NewFaqForm
  },
  {
    pathnames: [
      '/faq/astro/:id',
      '/faq/bracelets/:id',
      '/faq/bars/:id',
      '/faq/beads/:id',
    ],
    component: EditFaqForm
  },
  {
    pathnames: ['/articles/new'],
    component: NewArticleForm
  },
  {
    pathnames: ['/articles/:id'],
    component: EditArticleForm
  },
  {
    pathnames: ['/reviews/new'],
    component: NewReviewForm
  },
  {
    pathnames: ['/reviews/:id'],
    component: EditReviewForm
  },
  {
    pathnames: [
      '/catalog/beads/new',
      '/catalog/bracelets/new',
      '/catalog/kindles/new',
      '/catalog/others/new',
    ],
    component: NewCatalogForm
  }
]


const StyledRouter = styled(Router)`
  width: 100%;
  background-color: ${({ theme }) => theme.color.beige};
`;

export default Admin;
