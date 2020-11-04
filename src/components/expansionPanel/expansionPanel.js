import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Container from '../container/container';

const ExpansionPanel = ({ className, title, text, HeaderComponent, activeIndicator }) => {
  const [ open, setOpen ] = useState(false);
  const [ contentHeight, setContentHeight ] = useState(0);
  const [ headerHeight, setHeaderHeight ] = useState(0);
  const headerRef = useRef();
  const contentRef = useRef();

  const calcContentHeight = () => {
    if (contentRef.current) {
      const { height } = contentRef.current.getBoundingClientRect();
      setContentHeight(height);
    }
  }
  
  const calcHeaderHeight = () => {
    if (headerRef.current) {
      const { height } = headerRef.current.getBoundingClientRect();
      setHeaderHeight(height);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', calcContentHeight);
    window.addEventListener('resize', calcHeaderHeight);
    return () => {
      window.removeEventListener('resize', calcContentHeight);
      window.removeEventListener('resize', calcHeaderHeight);
    }
  }, []);

  useEffect(() => {
    calcContentHeight();
  }, [ headerHeight, contentRef ])
  
  useEffect(() => {
    calcHeaderHeight();
  }, [headerRef]);

  const toggleOpen = () => setOpen(prev => !prev);

  const containerClick = activeIndicator
    ? undefined
    : toggleOpen;
  
  const indicatorClick = activeIndicator
    ? toggleOpen
    : undefined;

  return (
    <Wrapper
      direction='column'
      onClick={containerClick}
      className={className}
      $maxHeight={open ? headerHeight + contentHeight : headerHeight}
      $withTransition={!!contentHeight}
      $open={open}
      fullWidth>
      <Header className='header' ref={headerRef} alignItems='center' $minHeight={headerHeight} fullWidth>
        {
          HeaderComponent
          ? <HeaderComponent />
          : <p className='title'>{title}</p>
        }
        <Indicator
          onClick={indicatorClick}
          className='indicator'
          $open={open}>
            {open ? '-' : '+'}
          </Indicator>
      </Header>
      {
        !!headerHeight && 
        <Content
          className='content'
          $open={open}
          ref={contentRef}
          fullWidth>
          <p className='text'>{text}</p>
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

  box-sizing: border-box;
  padding: 0;

  /* padding: 15px 30px; */
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

  :hover > div:first-of-type p.title {
    transition: 0.3s;
    color: ${({ theme }) => theme.text.mutted};
  }
`;

const Content = styled(Container)`
  transition: 0.3s;
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  line-height: 28px;
  padding: 0px 32px 32px;
  box-sizing: border-box;
  .text {
    margin: 0;
  }
  /* ${ ({ $open }) => !$open && `
    height: 0;
    padding: 0;
  `} */
`;

const Header = styled(Container)`
  // background-color: #aaa;
  padding: 4px 32px;
  box-sizing: border-box;

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
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight}px;`}
`;

const Indicator = styled.span`
  margin-left: auto;
  user-select: none;
  font-family: ${({ $open }) => ($open ? 'Montserrat Alternates' : 'Cormorant Infant')};
`;

export default ExpansionPanel;
