import cx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router';

import Text from '../Text';
import CartIcon from '../icons/CartIcon';
import UserIcon from '../icons/UserIcon';

import styles from './Navbar.module.scss';

const navItems = [
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About us' },
];

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="Lalasia logo" />
        <Text view="p-20" tag="span" color="primary" weight="bold">
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
    </header>
  );
};

export default Header;
