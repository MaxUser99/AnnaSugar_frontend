import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const ExpandableTextWrapper = ({ children, hidden }) => {
  const [contentHeight, setHeight] = useState();

  const refCallback = node => {
    if (!node) return;
    const contentH = [...node.childNodes.values()].reduce((total, curr) => total + curr.scrollHeight, 0);
    setHeight(contentH);
  }

  return (
    <Wrapper $hidden={hidden} $height={contentHeight} ref={refCallback}>
      { children }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
  transition: 0.3s;
  ${({ $hidden }) => ($hidden ? hiddenStyles : expandedStyles)};
`;

const hiddenStyles = css`
  height: 0;
`;

const expandedStyles = css`
  height: ${ ({ $height }) => (
    $height
    ? `${$height}px`
    : `auto`
  )};
`;

export default ExpandableTextWrapper;
