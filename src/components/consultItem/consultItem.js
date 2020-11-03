import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import Container from '../container/container';
// import FaqList from './faqList';
// import OptionsSelect from './optionsSelect';
// import OptionsList from './optionsList';
import Button from '../../components/button/button';
import infoIcon from '../../assets/icons/info.svg';
import Price from '../../components/price/price';
import { BREAKPOINTS, $maxWidth, $minWidth } from '../../theme';
import Dropdown from '../../components/dropdown';
import { ConsultDataType } from '../../constants/consultDataType';
import ExpansionPanel from '../expansionPanel/expansionPanel';

const ACTIONS = {
  SET_DROPDOWN: 'SET_DROPDOWN',
  SET_SELECT_LIST: 'SET_SELECT_LIST',
  RESET: 'RESET'
}

const setDropdown = (name, value) => ({ type: ACTIONS.SET_DROPDOWN, payload: { name, value }});
const setSelect = (name, value) => ({ type: ACTIONS.SET_DROPDOWN, payload: { name, value }});
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
        [action.payload.name]: action.payload.value
      }
    };;
    case ACTIONS.SET_SELECT_LIST: return {
      ...state,
      [ConsultDataType.SELECT_LIST]: {
        ...state[ConsultDataType.SELECT_LIST],
        [action.payload.name]: action.payload.value
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

  const [ state, dispatch ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (type === ConsultDataType.DROPDOWNS) {
      data.forEach(({ name, options }) => {
        dispatch(setDropdown(name, options[0]));
      });
    }
    if (type === ConsultDataType.SELECT_LIST) {
      const value = data.options[0];
      const name = data.name;

      dispatch(setSelect(name. value));
    }
    return () => dispatch(reset());
  }, []);

  const dropDownChangeHandler = (name) => value => dispatch(setDropdown(name, value[0]));

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
          {/* { optionsSelect && <OptionsSelect data={optionsSelect} />} */}
          {/* { optionsList && <OptionsList data={optionsList} />} */}
          {/* { faqList && <FaqList data={faqList} />} */}
          {
            type === ConsultDataType.FAQ_LIST &&
            data.map(x => (
              <StyledPanel key={x.name} title={x.title} text={x.text} />
            ))
          }
          {
            type === ConsultDataType.DROPDOWNS &&
            data.map(x =>  (
                <Dropdown
                  key={x.name}
                  options={x.options}
                  value={state[ConsultDataType.DROPDOWNS][x.name] || x.options[0]}
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
              <Label>Цена</Label>
              <StyledPrice remark={`(${priceRemark})`}>{price}</StyledPrice>
            </>
          }
          <Button>заказать</Button>
        </ContentBlock>
      </MainBlock>
      { description && <Descritption>{ description }</Descritption> }
    </Container>
  );
};

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
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    flex-direction: column;
    align-items: center;
  `)}
`;
const Descritption = styled(Container)``;
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
