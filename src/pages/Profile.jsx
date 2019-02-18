import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pencil from '../components/icons/Pencil';
import Avatar from '../components/icons/Avatar';
import eye from '../components/login/img/eye.svg';
import privat from '../components/login/img/private.svg';
import styles from './profile.module.scss';
import EditableInput from './../components/editableInput/editableInput';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: {
      email: '',
      name: '',
    },
  };

  state = {
    name: this.props.user.name,
    isEditing: false,
    newPass: '',
    oldPass: '',
    isVisibleOldPass: false,
    isVisibleNewPass: false,
  }

  handleInputChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  openEditInput = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  changeVisibilityOldPass = (e) => {
    e.preventDefault();
    this.setState({
      isVisibleOldPass: !this.state.isVisibleOldPass,
    });
  }

  changeVisibilityNewPass = (e) => {
    e.preventDefault();
    this.setState({
      isVisibleNewPass: !this.state.isVisibleNewPass,
    });
  }

  editSuccess = (text) => {
    this.setState({
      name: text,
      isEditing: true,
    });
  };

  render() {
    const { isVisibleNewPass, isVisibleOldPass, newPass, oldPass, isEditing } = this.state;
    const { user } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Avatar className={styles.avatar} />
            <h1 className={styles.name}>{user.name}</h1>
            <button onClick={this.openEditInput}>
              <Pencil className={styles.pencil} />
            </button>
          </div>
          <div>
            <h2 className={styles.h2}>Персональная информация</h2>
            <div className={styles.block}>
              <div className={styles.label}>Имя Фамилия</div>
              {isEditing ? <EditableInput
                className={styles.inputEdit}
                text={user.name}
                onEditSuccess={this.editSuccess}
              />
                : (<div className={styles.info}>{user.name}</div>)}
            </div>
            <div className={styles.block}>
              <div className={styles.label}>Электронная почта</div>
              {isEditing ? <EditableInput
                className={styles.inputEdit}
                text={user.email}
                onEditSuccess={this.editSuccess}
              />
                : (<div className={styles.info}>{user.email}</div>) }
            </div>
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
            <button className={styles.button}>Сохранить</button>
          </div>
        </div>
      </div>
    );
  }
}

const mSTP = state => ({
  user: state.session.user,
});

export default connect(mSTP)(Profile);
