import clsx from 'clsx';
import classes from './BurgerMenu.module.scss';

export interface IMenuButtonProps {
  toggleMenu: () => void;
  isActive?: boolean;
}

export const MenuButton = ({ toggleMenu, isActive }: IMenuButtonProps) => {
  return (
    <div className={clsx(classes.menu_btn, isActive && classes.open)} onClick={toggleMenu}>
      <div className={classes.menu_btn__burger} />
    </div>
  );
};
