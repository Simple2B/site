'use client';

import '@splidejs/splide/dist/css/splide.min.css';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useMediaQuery } from "react-responsive";
import { FeedBack } from '@/api/model';
import { Feedback } from './Feedback';


interface Props {
  feedbacks: FeedBack[];
}

export const FeedbackSlider = ({ feedbacks }: Props) => {
  const isTablet = useMediaQuery({
    query: '(max-width: 745px)',
  });

  const isPhone = useMediaQuery({
    query: '(max-width: 425px)',
  });

  const SPLIDE_OPTION = {
    type: 'loop',
    speed: 500,
    padding: "15%",
    gap: '1rem',
    easing: 'linear',
    fixedWidth: isPhone ? '15rem' : isTablet ? '19rem' : '32rem',
    fixedHeight: '22rem',
    arrows: false,

  };


  return (
    <div className="w-full sm:w-80">

      <Splide options={SPLIDE_OPTION}>
        {feedbacks.map((feedback) => (
          <SplideSlide key={feedback.uuid}>
            <Feedback feedback={feedback} />
          </SplideSlide>
        ))}

      </Splide>
    </div>
  );
};
