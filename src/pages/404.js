import React from 'react';
import { Redirect } from '@reach/router';

const NotFound = () => {
  return <Redirect to='/' noThrow />;
}

export default NotFound;
