import { useState, useLayoutEffect } from 'react';

export function useFooterHeight() {
  const [ height, setHeight ] = useState();

  useLayoutEffect(() => {
    function calcHeight() {
      const footer = document.getElementById('footer');
      if (!footer) return;
      const { height: footerHeight } = footer.getBoundingClientRect();
      setHeight(footerHeight);
    }

    calcHeight();

    window.addEventListener('resize', calcHeight);
    return () => {
      window.removeEventListener('resize', calcHeight);
    }
  }, []);

  return height;
}
