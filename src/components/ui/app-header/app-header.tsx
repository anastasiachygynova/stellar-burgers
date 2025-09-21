import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} text text_type_main-default ml-2 ${isActive ? styles.link_active : ''}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={getNavLinkClass}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </span>
              </>
            )}
          </NavLink>
          <NavLink to='/feed' className={getNavLinkClass}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <span className='text text_type_main-default ml-2'>
                  Лента заказов
                </span>
              </>
            )}
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <NavLink to='/profile' className={getNavLinkClass}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </span>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
