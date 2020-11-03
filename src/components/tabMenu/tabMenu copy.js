import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tab from './tab';
import Container from '../container/container';
import { useSwipeable } from 'react-swipeable';

const TabMenu = ({ tabs }) => {
  const [ node, setNode ] = useState();

  const { ref: swipeRef } = useSwipeable({
    // onSwiping: ({ deltaX }) => {
    //   if (node) {
    //     node.scrollLeft += deltaX / 20;
    //   }
    // }
    onSwipedLeft: () => {
      if (!node) return;

      const { offsetWidth, scrollWidth, scrollLeft } = node;
      const { right } = node.getBoundingClientRect();
      const shouldScroll = scrollLeft + offsetWidth < scrollWidth;

      if (shouldScroll) {
        const tabNodes = Array.prototype.slice.call(node.querySelectorAll('a'));
        const target = tabNodes.find(x => Math.trunc(x.getBoundingClientRect().right) > Math.trunc(right));
        let distance = target 
          ? Math.trunc(target.getBoundingClientRect().right) - Math.trunc(right)
          : 0;
        node.scrollLeft += distance;
      }
    },
    onSwipedRight: () => {
      if (!node) return;

      const { scrollLeft } = node;
      const { left } = node.getBoundingClientRect();
      const shouldScroll = !!scrollLeft;

      if (shouldScroll) {
        const tabNodes = Array.prototype.slice.call(node.querySelectorAll('a'));
        tabNodes.forEach(x => console.log(x.getBoundingClientRect()))
        const target = tabNodes.find(x => Math.trunc(x.getBoundingClientRect().left) < Math.trunc(left));
        const distance = target
          ? Math.trunc(target.getBoundingClientRect().left)
          : 0;
        node.scrollLeft += distance;
      }
    }
  });

  return (
    <Menu
      ref={ref => {
        swipeRef(ref);
        if (ref) setNode(ref);
      }}
      justifyContent='center'
      alignItems='center'
      fullWidth>
      {
        tabs.map(({ title, href }) => (
          <Tab key={href} href={href}>
            {title}
          </Tab>
        ))
      }
    </Menu>
  );
}

const Menu = styled(Container)`
  overflow: hidden;
  justify-content: flex-start;
  padding: 0 10px;
`;

TabMenu.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string
  }))
};

export default TabMenu;
