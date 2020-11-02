import { useLayoutEffect, useState } from 'react';

export function useEmptySpace(gutters = 0) {
  const [ freeSpace, setSpace ] = useState(0);

  useLayoutEffect(() => {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    if (!header || !footer) return;
    const { bottom } = header.getBoundingClientRect();
    const { top } = footer.getBoundingClientRect();
    setSpace(top - bottom - gutters);
  }, []);

  return freeSpace;
}
