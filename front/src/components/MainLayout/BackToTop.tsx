'use client';

import { IMG_DOMAIN_SERVER } from '@/app/constants-server';
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
        className={`fixed bottom-20 right-4 z-10 cursor-pointer hover:scale-110 transform transition duration-300 ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}

        onClick={handleBackToTop}
      >
        <Image
          src={`${IMG_DOMAIN_SERVER}/others/back_to_top.svg`}
          alt="back to top"
          width={45}
          height={45}
        />
      </a>
    </div>
  );
};

export default BackToTop;
