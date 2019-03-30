import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '../icons/Avatar';
import styles from './user_menu.module.scss';


class UserMenu extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.menuRef = createRef();
  }

  state = {
    isOpen: false,
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (e.target !== this.menuRef.current) {
      this.setState({ isOpen: false });
      document.removeEventListener('click', this.handleClickOutside);
    }
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
        ref={this.menuRef}
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
