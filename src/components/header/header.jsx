import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './header.module.scss';


import arrow from '../../img/arrow-point-to-down.svg';
import user from '../../img/user.svg';

const PublicActions = () => (
  <Fragment>
    <Link to="/login">Войти </Link>
    <Link to="/register">Зарегистрироваться </Link>
  </Fragment>
);

const PrivateActions = ({userName, handleLogout}) => (
  <ul className={styles.menu}>
      <li>
        <Link to="/profile">{userName}</Link>
      </li>
      <li>
        <Link to="/profile"><img src={user} alt="" className={styles.user}/></Link>
      </li>
      <li className={styles.menuItem}><button className={styles.button}><img src={arrow} alt=""/></button>
      <ul className={styles.submenu} >
        <li key="1-1" className={styles.submenuItem}>
          <Link to="/profile">
            Настройки профиля
          </Link>
        </li>
        <li key="1-2">
          <button onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
      </li>
  </ul>
);

PrivateActions.propTypes = {
  userName: PropTypes.string,
  handleLogout: PropTypes.func,
}

PrivateActions.defaultProps = {
  userName: '',
  handleLogout: () => {}
}

const Header = ({authenticated, userName, ...props}) => (
  <header className={styles.header}>
    <Link to="/">
      Tasktrecker
    </Link>
    <div>
      { authenticated ?
        (
          <PrivateActions userName={userName} {...props}/>
        ) : (
          <PublicActions />
        )
      }
    </div>
  </header>
);

Header.propTypes = {
  authenticated: PropTypes.bool,
  userName: PropTypes.string,
  handleLogout: PropTypes.func,
}

Header.defaultProps = {
  authenticated: false,
  userName: '',
  handleLogout: () => {},
}

export default Header;
