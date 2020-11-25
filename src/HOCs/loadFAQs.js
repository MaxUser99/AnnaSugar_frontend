import React, { useEffect } from 'react';
import { useLocation, navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import RESOURCE_STATUS from '../constants/resourceStatus';
import { loadFaqs, reloadFaqs } from '../store/content/faqActions';
import { onLangChange } from '../hooks/onLangChange';
import { useFaqLinks } from '../hooks/useFaqLilnks';

const loadFAQs = (Component) => (
  (props) => {
    const { pathname } = useLocation();
    const faqLinks = useFaqLinks();
    const dispatch = useDispatch();
    const { data, status } = useSelector(({ content: { faq: { astro, beads, bracelets, bars, status }} }) => ({
      data: [...astro, ...beads, ...bracelets, ...bars],
      status
    }));

    onLangChange(() => dispatch(reloadFaqs()), 'reloadFaqs');

    useEffect(() => {
      if (!data.length && status !== RESOURCE_STATUS.LOADING) {
        dispatch(loadFaqs());
      } 
    }, []);

    useEffect(() => {
      // console.log({ pathname, faqLinks })
      if (!faqLinks.some(({ href }) => pathname.includes(href))) {
        navigate(faqLinks[0].href, { replace: true });
      }
    }, [pathname, faqLinks ])

    return <Component {...props} links={faqLinks} />;
  }
);

export default loadFAQs;
