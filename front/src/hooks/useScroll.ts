import { useEffect, useState } from "react";

/**
 * To calculate what percentage of page height the scroll is currently at
 * and returns true if it is correct.
 * @param heightPercent percentage after (or equal) which true state returns
 * @returns boolean
 */
export const useScroll = (heightPercent: number) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  console.log('hook');


  useEffect(() => {
    const handleScroll = () => {

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      setShowBackToTop(scrollPercent >= heightPercent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heightPercent]);

  return [showBackToTop];
}
