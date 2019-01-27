import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './header.module.scss';
import logo from '../../images/logo_pick.png';
import Avatar from '../icons/Avatar';
import UserMenu from '../user_menu/User_menu';

const PublicActions = () => (
  <>
    <Link to="/login" className={styles.login_link}>Войти </Link>
    <Link to="/register">Зарегистрироваться </Link>
  </>
);

const PrivateActions = ({ userName, handleLogout }) => (
  <div>
    <div className={styles.avatar_wrapper}>
      <Avatar className={styles.avatar} />
    </div>
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
};

PrivateActions.defaultProps = {
  userName: '',
  handleLogout: () => {},
};

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    userName: PropTypes.string,
    handleLogout: PropTypes.func,
    getUserInfo: PropTypes.func.isRequired,
  };

  static defaultProps = {
    authenticated: false,
    userName: '',
    handleLogout: () => {},
  };

  componentDidMount() {
    const { authenticated, getUserInfo } = this.props;
    if (authenticated) getUserInfo();
  }

  render() {
    const { authenticated, userName, handleLogout } = this.props;
    return (
      <header className={styles.header}>
        <Link className={styles.logo_link} to="/">
          <img src={logo} alt="tasktraker" /> Tasktracker
        </Link>
        <div>
          { authenticated ?
            (
              <UserMenu userName={userName} handleLogout={handleLogout} />
            ) : (
              <PublicActions />
            )
          }
        </div>
      </header>
    );
  }
}

export default Header;
