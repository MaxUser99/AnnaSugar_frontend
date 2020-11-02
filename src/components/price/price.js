import React from 'react';
import styled from 'styled-components';

const amountPlaceholder = '-';
const centsPlaceholder = '';

const Price = ({ className, children, remark }) => {
  const [ amount, cents ] = children
    ? children.toFixed(2).split('.')
    : [amountPlaceholder, centsPlaceholder];

  const transformedAmount = [...amount].reduceRight(
    (acc, curr, i, arr) => {
      const reversI = arr.length - i;
      if (reversI % 4 === 0) return curr + ' ' + acc; 
      return curr + acc;
    }
  );

  return (
    <Root className={className}>
      <Amount>{transformedAmount}</Amount>
      <Cents>.{cents} &#8381;</Cents>
      {remark && <Remark>{remark}</Remark>}
    </Root>
  );
}

const Root = styled.p`
  white-space: nowrap;
`;

const Amount = styled.span`
  font-weight: 300;
  font-size: 35px;
  line-height: 43px;
  letter-spacing: 1px;
`;

const Cents = styled.span`
  font-weight: 300;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 1px;
`;

const Remark = styled.span`
  letter-spacing: normal;
`;

export default Price;
