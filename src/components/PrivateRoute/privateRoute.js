import React, { useEffect } from 'react';
import { useNavigate } from "@reach/router";
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [isLoggedIn]);

  return isLoggedIn
    ? <Component {...rest} />
    : null;
}

export default connect(
  ({ userData: { user }}) => ({
    isLoggedIn: !!user
  }),
  null
)(PrivateRoute);