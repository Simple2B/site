'use client';

import '@splidejs/splide/dist/css/splide.min.css';

import Image from 'next/image';
import { GALLERY } from '@/types/gallery';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { IMG_DOMAIN } from '@/app/constants';

const SPLIDE_OPTION = {
  type: 'loop',
  speed: 650,
  padding: '15%',
  gap: '5rem',
  easing: 'linear ',
};

export const Gallery = () => {
  return (
    <div className="mb-[11rem] phone-min-max:h-[250px] xs:mb-[5rem]">
      <Splide options={SPLIDE_OPTION}>
        {GALLERY.map(({ id, photo }) => (
          <SplideSlide key={id}>
            <div
              className="block gallerySlideClass"
              onClick={() =>
                window.open(`${IMG_DOMAIN}/gallery/${photo}.jpg`, '_blank')
              }
            >
              <Image
                src={`${IMG_DOMAIN}/gallery/${photo}.jpg`}
                alt="Simple2B gallery"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                priority={true}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
