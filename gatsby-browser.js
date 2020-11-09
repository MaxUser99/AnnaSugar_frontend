import React from 'react';
import ReactDOM from 'react-dom'
import ReduxWrapper from './src/store/reduxWrapper';
import { ThemeWrapper } from './src/theme';

export const wrapRootElement = ({ element }) => (
  <ReduxWrapper>
    <ThemeWrapper>
      { element }
    </ThemeWrapper>
  </ReduxWrapper>
);

export function replaceHydrateFunction() {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback)
  }
}
