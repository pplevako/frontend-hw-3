import Text from '@components/Text';
import CartIcon from '@components/icons/CartIcon';
import UserIcon from '@components/icons/UserIcon';
import cx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router';

import styles from './Header.module.scss';

const navItems = [
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About us' },
];

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Lalasia logo" />
          <Text className={styles.logoBrand} view="p-20" tag="span" color="primary" weight="bold">
            Lalasia
          </Text>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cx({ [styles.active]: isActive })}
            >
              {({ isActive }) => (
                <Text view="p-18" tag="span" color={isActive ? 'accent' : 'primary'}>
                  {item.label}
                </Text>
              )}
            </NavLink>
          ))}
        </nav>
        <div className={styles.userActions}>
          <CartIcon />
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
