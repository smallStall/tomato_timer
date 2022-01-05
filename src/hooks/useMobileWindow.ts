import { useEffect, useState, useCallback } from "react";

const MOBILE_WIDTH = 576;

export const useMobileWindow = () : {isMobile : boolean}=> {
  const isClient = typeof window === 'object';
  const getWindowWidth = useCallback(() => {
    return isClient ? window?.innerWidth : 0;
  }, [isClient]);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  useEffect(() => {
    const onResize = () => {
      setWindowWidth(getWindowWidth());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getWindowWidth]);
  return { isMobile: windowWidth < MOBILE_WIDTH };
};
