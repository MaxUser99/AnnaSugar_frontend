import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../container/container';
import SelectList from './selectList';
import Button from '../../components/button/button';
import infoIcon from '../../assets/icons/info.svg';
import Price from '../../components/price/price';
import { BREAKPOINTS, $maxWidth, $minWidth } from '../../theme';
import Dropdown from '../../components/dropdown';
import { ConsultDataType } from '../../constants/consultDataType';
import ExpansionPanel from '../expansionPanel/expansionPanel';
import SOCIAL_LINKS from '../../constants/socialLinks';
import { useLocalization } from '../../hooks/useLocalization';

const ACTIONS = {
  SET_DROPDOWN: 'SET_DROPDOWN',
  SET_SELECT_LIST: 'SET_SELECT_LIST',
  RESET: 'RESET'
}

const setDropdown = (name, value, dirty = true) => ({ type: ACTIONS.SET_DROPDOWN, payload: { name, value, dirty }});
const setSelect = (value, dirty = true) => ({ type: ACTIONS.SET_SELECT_LIST, payload: { value, dirty }});
const reset = () => ({ type: ACTIONS.RESET });

const initialState = {
  [ConsultDataType.DROPDOWNS]: {},
  [ConsultDataType.SELECT_LIST]: {},
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DROPDOWN: return {
      ...state,
      [ConsultDataType.DROPDOWNS]: {
        ...state[ConsultDataType.DROPDOWNS],
        [action.payload.name]: {
          value: action.payload.value,
          dirty: action.payload.dirty,
        }
      }
    };;
    case ACTIONS.SET_SELECT_LIST: return {
      ...state,
      [ConsultDataType.SELECT_LIST]: {
        ...state[ConsultDataType.SELECT_LIST],
        selected: action.payload.value,
        dirty: action.payload.dirty,
      }
    };
    default: return state;
  }
}


const ConsultItem = ({ item }) => {
  const {
    title,
    image,
    short,
    description,
    imageInfo,
    price,
    priceRemark,
    info,
    type,
    data
  } = item;

  const { t } = useLocalization();
  const [ state, dispatch ] = useReducer(reducer, initialState, (s) => {
    if (type === ConsultDataType.DROPDOWNS) {
      return data.reduce((currState, { name, options }) => {
        return reducer(currState, setDropdown(name, options[0], false));
      }, s);
    }
    if (type === ConsultDataType.SELECT_LIST) {
      const value = data[0];
      return reducer(s, setSelect(value), false);
    }

    return s;
  });

  const dropDownChangeHandler = (name) => value => dispatch(setDropdown(name, value[0]));

  const setSelected = (selectItem) => dispatch(setSelect(selectItem));

  const offerClickHandler = () => window.open(SOCIAL_LINKS.WHATS_UP);

  return (
    <Container direction='column' fullWidth>
      <MainBlock alignItems='flex-start' justifyContent='space-between' fullWidth>
        <ImageContainer
          direction='column'
          justifyContent='center'
          alignItems='center'
          fullWidth>
            <img src={`/${image}`} alt='' />
            { imageInfo && <Info $showFrom={BREAKPOINTS.TABLET}>{imageInfo}</Info>}
        </ImageContainer>
        <ContentBlock direction='column' fullWidth>
          <Title>{ title }</Title>
          <Short>{short}</Short>
          {
            type === ConsultDataType.SELECT_LIST &&
            <SelectList
              selected={state[ConsultDataType.SELECT_LIST].selected}
              items={data}
              setSelected={setSelected}
            />
          }
          {
            type === ConsultDataType.FAQ_LIST &&
            data.map(x => (
              <StyledPanel key={x.title} title={x.title} text={x.text} />
            ))
          }
          {
            type === ConsultDataType.DROPDOWNS &&
            data.map(x =>  (
                <StyledDropdown
                  key={x.name}
                  options={x.options}
                  value={state[ConsultDataType.DROPDOWNS][x.name].value}
                  $dirty={state[ConsultDataType.DROPDOWNS][x.name].dirty}
                  label={x.name}
                  changeHandler={dropDownChangeHandler(x.name)}
                />
              )
            )
          }
          { info && <Info>{info}</Info>}
          { imageInfo && <Info $showBefore={BREAKPOINTS.TABLET}>{imageInfo}</Info>}
          {
            price && <>
              <Label>{t('Цена')}</Label>
              <StyledPrice
                remark={
                  priceRemark
                  ? `(${priceRemark})`
                  : null
              }>
                {price}
              </StyledPrice>
            </>
          }
          {
            state[ConsultDataType.SELECT_LIST].selected && state[ConsultDataType.SELECT_LIST].selected.price && <>
              <Label>{t('Цена')}</Label>
              <StyledPrice
                remark={
                  state[ConsultDataType.SELECT_LIST].selected.time
                  ? ` (${state[ConsultDataType.SELECT_LIST].selected.time} минут)`
                  : ''
                }>{state[ConsultDataType.SELECT_LIST].selected.price}</StyledPrice>
            </>
          }
          <Button onClick={offerClickHandler}>{t('записаться')}</Button>
        </ContentBlock>
      </MainBlock>
      {
        description &&
        <Descritption direction='column'>
          <strong>{t('Описание')}:</strong>
          <p>{ description }</p>
        </Descritption>
      }
    </Container>
  );
};

const StyledDropdown = styled(Dropdown)`
  + button {
    margin-top: 64px;
  }
  .value {
    ${ ({ $dirty }) => $dirty && 'opacity: 1;'}
  }
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    width: 100%;
    > div {
      width: 100%;
    }
  `)}
`;

const StyledPanel = styled(ExpansionPanel)`
  box-sizing: border-box;
  padding: 0;
  .header {
    padding: 4px 32px;
    box-sizing: border-box;
  }
  :first-of-type {
    margin-top: 17px;
  }
  :last-of-type {
    margin-bottom: 32px;
  }
`;

const MainBlock = styled(Container)`
  margin-top: 48px;
  margin-bottom: 64px;
  ${ $maxWidth(700, `
    flex-direction: column;
    align-items: center;
  `)}
`;
const Descritption = styled(Container)`
  white-space: pre-line;
  margin-bottom: 64px;
  p {
    font-size: 16px;
    line-height: 36px;
  }
  strong {
    font-size: 10px;
    line-height: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;
const ImageContainer = styled(Container)`
  max-width: 350px;
  min-width: 220px;
  img {
    height: 100%;
    width: 100%;
  }
`;
const ContentBlock = styled(Container)`
  /* max-width: 508px; */
  /* margin-left: 25px; */
  margin-left: 110px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'margin-left: 38px;')}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'margin-left: 0;')}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'button { width: 100%; }')}
`;

const Info = styled.p`
  position: relative;
  padding-left: 25px;
  font-size: 14px;
  line-height: 28px;
  color: ${({ theme }) => theme.color.black};
  white-space: pre-wrap;
  ::before {
    content: "";
    position: absolute;
    left: 0;
    top: 3px;
    display: block;
    width: 21px;
    height: 21px;
    background: url(${infoIcon});
  }
  ${({ $showFrom }) => $showFrom && $maxWidth($showFrom, `display: none;`)}
  ${({ $showBefore }) => $showBefore && $minWidth($showBefore, `display: none;`)}
`;

const Title = styled.h2`
  margin: 16px 0 10px;
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  color: ${({ theme }) => theme.text.header};
`;

const StyledPrice = styled(Price)`
  margin: 0;
  & + button {
    margin-top: 32px
  }
`;

const Short = styled.p`
  font-size: 14px;
  line-height: 28px;
  color: ${({ theme }) => theme.text.default};
`;
const Label = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme }) => theme.text.mutted};
  margin: 32px 0 0;
`;

export default ConsultItem;
