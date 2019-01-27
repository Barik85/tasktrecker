import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '../icons/Avatar';
import styles from './user_menu.module.scss';


class UserMenu extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
  }

  handleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }


  render() {
    const { userName, handleLogout } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={styles.dropdown_wrapper}
        onClick={this.handleOpen}
        role="button"
        tabIndex="0"
      >
        <div className={styles.dropdown_title}>
          {userName}
          <div className={styles.avatar_wrapper}>
            <Avatar className={styles.avatar} />
          </div>
        </div>
        { isOpen ? (
          <ul className={styles.dropdown_menu}>
            <li>
              <Link to="/profile" className={styles.menu_item}>
              Настройки профиля
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.menu_item}>Выйти</button>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default UserMenu;
