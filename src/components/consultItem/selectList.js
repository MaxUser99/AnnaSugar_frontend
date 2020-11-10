import React from 'react';
import styled from 'styled-components';
import ExpansionPanel from '../expansionPanel/expansionPanel';
import Container from '../container/container';
import { amountTransformer } from '../price/price';
import CheckedIcon from '../../assets/icons/checked.svg';
import UncheckedIcon from '../../assets/icons/unchecked.svg';
import { $maxWidth, BREAKPOINTS } from '../../theme';

const SelectList = ({
  selected,
  items,
  setSelected
}) => {
  const rootClickHandler = item => e => {
    e.stopPropagation();
    setSelected(item);
  }
  return (
    <Container direction='column' fullWidth>
      {
        items.map(x => {
          const [ rawAmount, cents] = x.price
            ? x.price.toFixed(2).split('.')
            : [];

          const amount = amountTransformer(rawAmount);

          let remark;
          if (x.remark && x.time) {
            remark = x.remark.replace('${time}', `${x.time}`);
          } else if (x.remark) {
            remark = x.remark;
          }

          return (
            <StyledPanel
              key={x.title}
              text={x.info}
              title={x.title}
              activeIndicator
              HeaderComponent={() => (
                <Container onClick={rootClickHandler(x)} alignItems='center' fullWidth>
                  <CheckedIndicator $checked={selected === x} />
                  <Container direction='column' fullWidth>
                    <Title>{x.title}</Title>
                    <Info>
                      {amount}.{cents} &#8381;
                      { remark && <span> ({remark})</span>}
                    </Info>
                  </Container>
                </Container>
              )}
            />
          );
        })
      }
    </Container>
  );
}

const StyledPanel = styled(ExpansionPanel)`
  min-width: 350px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'min-width: 320px;')}
  :last-of-type {
    margin-bottom: 0;
    ${ $maxWidth(800, 'margin-bottom: 32px;')}
  }
  .indicator {
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
  }
`;

const CheckedIndicator = styled.span`
  width: 23px;
  min-width: 23px;
  height: 20px;
  margin-right: 31px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `margin-right: 20px;`)}
  background: url(${ ({ $checked }) => ($checked ? CheckedIcon : UncheckedIcon)}) no-repeat center center;
`;

const Title = styled.h3`
  margin: 16px 0 10px;
  font-family: "Cormorant Infant";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
`;

const Info = styled.p`
  margin: 0 0 16px;
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 14px;
`;

export default SelectList;
