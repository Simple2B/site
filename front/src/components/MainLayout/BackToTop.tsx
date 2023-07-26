"use client"

import { useScroll } from '@/hooks/useScroll';
import Image from 'next/image';

const BackToTop = () => {
  const [showBackToTop] = useScroll(20);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <a
        className={`fixed bottom-10 right-4 z-10 cursor-pointer hover:scale-110 transform transition duration-300 ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleBackToTop}
      >
        <Image
          src={'svg/icons/back_to_top.svg'}
          alt='back to top'
          width={40}
          height={40}
        />
      </a>
    </div>
  );
};

export default BackToTop;
