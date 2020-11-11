import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Container from '../container/container';
import { BREAKPOINTS, $maxWidth, $minWidth } from '../../theme';

const PADDINGS = {
  default: css`
    padding: 0px 244px 0;
    ${ $maxWidth(BREAKPOINTS.XL, `padding: 0px 100px 0px;`)}
    ${ $maxWidth(BREAKPOINTS.DESCTOP, `padding: 0px 88px 0px 88px;`)}
    ${ $maxWidth(BREAKPOINTS.MOBILE, `padding: 0 10px;`)}
  `,
  wide: css`
    padding: 0px 136px 0px 98px;
    ${ $maxWidth(BREAKPOINTS.XL, `padding: 0px 80px 0px;`)}
    ${ $maxWidth(BREAKPOINTS.DESCTOP, `padding: 0px 64px 0px 64px;`)}
  `,
  none: css``
}

const ContentWrapper = (props) => (
  <Wrapper {...props} fullWidth/>
);

const Wrapper = styled(Container)`
  max-width: 1440px;
  /* padding: ${({ maxWidth = 'default' }) => PADDINGS[maxWidth]}; */
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  ${({ maxWidth = 'default' }) => PADDINGS[maxWidth]};
`;

ContentWrapper.propTypes = {
  maxWidth: PropTypes.oneOf([ 'wide', 'default', 'none' ]),
}

export default ContentWrapper;
