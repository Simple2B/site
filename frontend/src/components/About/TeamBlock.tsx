import React from 'react';
import classes from './About.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

export interface ITeamBlockProps {
  firstName: string;
  position: string;
  image: string;
}

export const TeamBlock: React.FC<ITeamBlockProps> = ({ firstName, image, position }) => {
  return (
    <div className={clsx(classes.profile__wrapper)}>
      <span className={clsx(classes.profile__image)}>
        <Image
          src={`/jpg/team/${image}.jpg`}
          alt={`${firstName} photo`}
          layout='fill'
          objectFit='cover'
          quality={100}
        />
      </span>
      <div className={classes.profile__text}>
        <h3 className={classes.profile__name}>{firstName}</h3>
        <h4 className={classes.profile__position}>{position.toUpperCase()}</h4>
      </div>
    </div>
  );
};
