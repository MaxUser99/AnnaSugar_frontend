import { useState, useEffect } from 'react';

export function useLoading(shouldLoad, apiCall) {
  const [ shouldRedirect, setRedirect ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      setLoading(true);
      const item = await apiCall();
      setLoading(false);
      if (!item) setRedirect(true);
    }

    if (shouldLoad) loadItem();
  }, []);

  return {
    shouldRedirect,
    isLoading,
  };
}