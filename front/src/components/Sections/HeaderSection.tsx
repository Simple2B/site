import clsx from 'clsx';
import React, { useState } from 'react';
import { CustomButton } from '../Buttons/CustomButton';
import classes from './HeaderSection.module.scss';
import Image from 'next/image';
import { useAppContext } from '../../context/state';

export interface IHeaderSectionProps {}

export const HeaderSection: React.FC<IHeaderSectionProps> = () => {
  const { openModal } = useAppContext();
  const [mouseCoordX, setMouseCoordX] = useState(0);
  const [mouseCoordY, setMouseCoordY] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLHeadingElement>) => {
    setMouseCoordX(event.clientX);
    setMouseCoordY(event.clientY);
  };

  const setMouseMoveCoords = (coordX: number, coordY: number) => {
    return { transform: `translate(${coordX}px, ${coordY}px)` };
  };

  return (
    <header className={clsx(classes.header)}>
      <div className='container' onMouseMove={handleMouseMove}>
        <div className={classes.header__wrapper}>
          <div className={classes.header__illustration}>
            <Image
              alt='Rocket bee'
              src={'/svg/bees/bee_rocket.svg'}
              width='100'
              height='100'
              sizes='100vw'
              // layout='responsive'
              // objectFit='contain'
            />
          </div>

          <div className={classes.parallax}>
            <div
              className={classes.parallax__dust1}
              style={setMouseMoveCoords(mouseCoordX / 2, mouseCoordY / 10)}
            ></div>

            <div
              className={classes.parallax__dust2}
              style={setMouseMoveCoords(mouseCoordX / 3, mouseCoordY / 5)}
            ></div>

            <div
              className={classes.parallax__dust3}
              style={setMouseMoveCoords(mouseCoordX / 4, mouseCoordY / 3)}
            ></div>
          </div>

          <div className={classes.header__content}>
            <p className={classes.header__description}>
              We help businesses to succeed through innovative and reliable solutions.
            </p>
            <CustomButton title='Get In Touch' size='large' type='filled' onClick={openModal} />
          </div>
        </div>
      </div>
    </header>
  );
};
