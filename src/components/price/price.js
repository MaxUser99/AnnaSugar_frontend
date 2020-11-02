import React from 'react';
import styled from 'styled-components';

const amountPlaceholder = '-';
const centsPlaceholder = '';

function amountTransformer(amount) {
  return [...amount].reduceRight(
    (acc, curr, i, arr) => {
      const reversI = arr.length - i;
      if (reversI % 4 === 0) return curr + ' ' + acc; 
      return curr + acc;
    }
  );
}

const Price = ({ className, children, remark }) => {
  let amount1, amount2, cents;

  if (Array.isArray(children)) {
    const [ rawAmount1 ] = children[0].toFixed(2).split('.');
    const [ rawAmount2, rawCents ] = children[1].toFixed(2).split('.');
    amount1 = amountTransformer(rawAmount1);
    amount2 = amountTransformer(rawAmount2);
    cents = rawCents;
  } else if (!!children) {
    const [ rawAmount1, rawCents ] = children.toFixed(2).split('.');
    amount1 = amountTransformer(rawAmount1);
    cents = rawCents;
  } else {
    amount1 = amountPlaceholder; 
    cents = centsPlaceholder;
  }

  return (
    <Root className={className}>
      <Amount>{amount1}</Amount>
      {amount2 && <><span className='separator'>/</span><Amount>{amount2}</Amount></>}
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
  + span.separator {
    font-size: 35px;
    line-height: 43px;
  }
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
