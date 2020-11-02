import React from 'react';
import ReduxWrapper from './src/store/reduxWrapper';
import { ThemeWrapper } from './src/theme';

export const wrapRootElement = ({ element }) => (
  <ReduxWrapper>
    <ThemeWrapper>
      { element }
    </ThemeWrapper>
  </ReduxWrapper>
);
