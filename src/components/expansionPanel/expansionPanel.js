import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Container from '../container/container';

const ExpansionPanel = ({ className, title, text }) => {
  const [ open, setOpen ] = useState(false);
  const [ contentHeight, setContentHeight ] = useState(0);
  const [ headerHeight, setHeaderHeight ] = useState(0);
  const headerRef = useRef();
  const contentRef = useRef();

  const toggleOpen = () => setOpen(prev => !prev);

  useEffect(() => {
    if (contentRef.current) {
      const { height } = contentRef.current.getBoundingClientRect();
      setContentHeight(height);
    }
  }, [ headerHeight, contentRef ])
  
  useEffect(() => {
    if (headerRef.current) {
      const { height } = headerRef.current.getBoundingClientRect();
      setHeaderHeight(height);
    }
  }, [headerRef]);

  return (
    <Wrapper
      direction='column'
      onClick={toggleOpen}
      className={className}
      $maxHeight={open ? headerHeight + contentHeight : headerHeight}
      $withTransition={!!contentHeight}
      $open={open}
      fullWidth>
      <Header ref={headerRef} alignItems='center' fullWidth>
        <p>{title}</p>
        <Indicator $open={open}>{open ? '-' : '+'}</Indicator>
      </Header>
      {
        !!headerHeight && 
        <Content
          $open={open}
          ref={contentRef}
          fullWidth>
          <p>{text}</p>
        </Content>
      }
    </Wrapper>
  )
};

const Wrapper = styled(Container)`
  overflow: hidden;
  margin-top: 10px;
  border-radius: 4px;
  /* padding: 0 30px; */
  padding: 15px 30px;
  border: 1px solid ${({ theme }) => theme.color.darkBeige};
  background-color: ${({ $open, theme }) => ($open ? theme.color.darkBeige : 'transparent')};
  max-height: ${({ $maxHeight }) => ($maxHeight === 0 ? 'auto' : `${$maxHeight}px`)};

  &:first-of-type {
    margin-top: 64px;
  }
  &:last-of-type {
    margin-bottom: 64px;
  }

  ${({ $withTransition }) => $withTransition && 'transition: 0.3s'};

  :hover > div:first-of-type p {
    transition: 0.3s;
    color: ${({ theme }) => theme.text.mutted};
  }
`;

const Content = styled(Container)`
  transition: 0.3s;
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  line-height: 28px;
`;

const Header = styled(Container)`
  // background-color: #aaa;
  cursor: pointer;
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  font-family: "Cormorant Infant";
  color: ${({ theme }) => theme.text.lighter2};
  p {
    padding-right: 12px;
    word-break: break-word;
  }
`;

const Indicator = styled.span`
  margin-left: auto;
  user-select: none;
  font-family: ${({ $open }) => ($open ? 'Montserrat Alternates' : 'Cormorant Infant')};
`;

export default ExpansionPanel;
