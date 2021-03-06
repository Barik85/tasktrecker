import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pencil from '../icons/Pencil';
import Avatar from '../icons/Avatar';
import eye from '..//login/img/eye.svg';
import privat from '..//login/img/private.svg';
import styles from './profile.module.scss';
import { updateUser } from '../login/loginActions';


class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired,
    updateUser: PropTypes.func.isRequired,
  };

  state = {
    name: this.props.user.name || '',
    email: this.props.user.email || '',
    isEditing: false,
    newPass: '',
    oldPass: '',
    isVisibleOldPass: false,
    isVisibleNewPass: false,
    error: null,
  }

  handleInputChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
      error: null,
    });
  }

  toggleEditInput = (e) => {
    e.preventDefault();
    const { user } = this.props;
    const name = user && user.name;
    const email = user && user.email;
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      name: name || '',
      email: email || '',
    }));
  }

  changeVisibilityOldPass = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      isVisibleOldPass: !prevState.isVisibleOldPass,
    }));
  }

  changeVisibilityNewPass = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      isVisibleNewPass: !prevState.isVisibleNewPass,
    }));
  }

  saveChange = (e) => {
    e.preventDefault();
    this.setState({
      isEditing: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { user, updateUser: editUser } = this.props;
    const id = user.id;

    editUser({ id, name, email })
      .then((res) => {
        if (res && res.status === 400) {
          this.setState({ error: res && res.data && res.data.info });
        }
        this.setState({
          isEditing: false,
        });
      });
  }

  render() {
    const {
      name,
      email,
      isVisibleNewPass,
      isVisibleOldPass,
      newPass, oldPass,
      isEditing,
      error,
    } = this.state;
    const { user } = this.props;
    return (
      <form className={styles.wrapper} onSubmit={this.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Avatar className={styles.avatar} />
            <h1 className={styles.name}>{user.name}</h1>
            <button onClick={this.toggleEditInput}>
              <Pencil className={styles.pencil} />
            </button>
          </div>
          <div>
            <h2 className={styles.h2}>Персональная информация</h2>
            <div className={styles.block}>
              <div className={styles.label}>Имя Фамилия</div>
              {isEditing ?
                <input
                  className={styles.inputEdit}
                  onChange={this.handleInputChange}
                  value={name}
                  name="name"
                />
                : (<div className={styles.info}>{user.name}</div>)}
            </div>
            <div className={styles.block}>
              <div className={styles.label}>Электронная почта</div>
              {isEditing ?
                <input
                  className={styles.inputEdit}
                  name="email"
                  onChange={this.handleInputChange}
                  value={email}
                />
                : (<div className={styles.info}>{user.email}</div>)}
            </div>
            {error ? <p className={styles.error}>{error}</p> : null}
          </div>
          <div>
            <h2 className={styles.h2}>Смена пароля</h2>
            <div className={styles.block}>
              <label htmlFor="oldPass" className={styles.label}>Старый пароль</label>
              <input
                className={styles.input}
                type={isVisibleOldPass ? 'text' : 'password'}
                id="oldPass"
                name="oldPass"
                onChange={this.handleInputChange}
                value={oldPass}
              />
              <span>
                <input
                  className={styles.inputImage}
                  type="image"
                  src={isVisibleOldPass ? eye : privat}
                  alt="eye"
                  onClick={this.changeVisibilityOldPass}
                />
              </span>
            </div>
            <div className={styles.block}>
              <label htmlFor="newPass" className={styles.label}>Новый пароль</label>
              <input
                className={styles.input}
                type={isVisibleNewPass ? 'text' : 'password'}
                id="newPass"
                name="newPass"
                onChange={this.handleInputChange}
                value={newPass}
              />
              <span>
                <input
                  className={styles.inputImage}
                  type="image"
                  src={isVisibleNewPass ? eye : privat}
                  alt="eye"
                  onClick={this.changeVisibilityNewPass}
                />
              </span>
            </div>
          </div>
          <div className={styles.btnBlock}>
            <input
              type="submit"
              className={styles.button}
              value="Сохранить"
            />
          </div>
        </div>
      </form>
    );
  }
}

const mSTP = state => ({
  user: state.session.user,
});

const mDTP = {
  updateUser,
};


export default connect(mSTP, mDTP)(Profile);
