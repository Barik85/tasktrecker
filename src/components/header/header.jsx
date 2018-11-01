import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './header.module.scss';
import logo from '../../images/logo_white.png';

const PublicActions = () => (
  <Fragment>
    <Link to="/login" className={styles.login_link}>Войти </Link>
    <Link to="/register">Зарегистрироваться </Link>
  </Fragment>
);

const PrivateActions = ({userName, handleLogout}) => (
  <div>
    {userName}
    <ul>
      <li>
        <Link to="/profile">
          Настройки профиля
        </Link>
      </li>
      <li>
        <button onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  </div>
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
    <Link className={styles.logo_link} to="/">
      <img src={logo} alt="tasktreker"/>
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
