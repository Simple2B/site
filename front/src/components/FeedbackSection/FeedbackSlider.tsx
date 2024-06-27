'use client';

import '@splidejs/splide/dist/css/splide.min.css';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { FeedBack } from '@/api/model';
import { Feedback } from './Feedback';

const SPLIDE_OPTION = {
  type: 'loop',
  speed: 500,
  padding: "15%", // "1rem 2rem
  gap: '1rem',
  easing: 'linear',
  fixedWidth: '32rem',
  fixedHeight: '22rem',
  arrows: false,
};

interface Props {
  feedbacks: FeedBack[];
}

export const FeedbackSlider = ({ feedbacks }: Props) => {

  return (
    <div className="w-full">
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
