import clsx from 'clsx';
import classes from './CustomList.module.scss';
import Image from 'next/image';
import { IMG_DOMAIN_SERVER } from '@/app/constants-server';

export interface ICustomListProps {
  list: { id: number; description: string }[];
  icon?: 'done' | 'pin';
  isAboutSection?: boolean;
}
export const CustomList = ({
  list,
  icon = 'done',
  isAboutSection,
}: ICustomListProps) => {
  return (
    <ul className={clsx(classes.list, isAboutSection && classes.list_width)}>
      {list.map(({ id, description }) => (
        <li key={id} className={classes.item}>
          <div className={classes.item__icon}>
            <Image
              alt="List item icon"
              src={`${IMG_DOMAIN_SERVER}/services/list_item_${icon}_24.svg`}
              width="24"
              height="24"
              sizes="24vw"
            />
          </div>

          <span className={classes.item__text}>{description}</span>
        </li>
      ))}
    </ul>
  );
};
