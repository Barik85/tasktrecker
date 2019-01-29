import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser, resetSessionError } from '../login/loginActions';
import styles from './register.module.scss';
import lockIcon from '../login/img/blocked-padlock.svg';
import letterIcon from '../login/img/letter.svg';
import userAvatar from '../login/img/avatar.svg';
import tickFalse from '../login/img/tick.svg';
import tickTrue from '../login/img/tickTrue.svg';
import privateEye from '../login/img/private.svg';
import eye from '../login/img/eye.svg';
import facebookLogo from '../login/img/facebook-logo.svg';
import googleplusLogo from '../login/img/google-plus.svg';
import linkedinLogo from '../login/img/linkedin-logo.svg';


const initialState = {
  name: '',
  email: '',
  password: '',
  errorResponse: null,
};

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    discardErrors: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    auth: false,
    history: null,
  }

  state = { ...initialState, isValidName: true, isValidEmail: true, isVisiblePassword: true };

  componentWillUnmount() {
    const { discardErrors } = this.props;
    discardErrors();
  }

  resetState = () => {
    this.setState(initialState);
  }

  handleInputChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
    this.validate(name, value);
  };

  validate = (name, value) => {
    if (name === 'email') {
      const valEmail = /^\S+@\S+\.\S+$/;
      this.setState({
        isValidEmail: valEmail.test(value),
      });
    } else if (name === 'name') {
      const valName = /^[A-z]+$/;
      this.setState({
        isValidName: valName.test(value),
      });
    }
  };

  visiblePassword = (e) => {
    e.preventDefault();
    this.setState({
      isVisiblePassword: !this.state.isVisiblePassword,
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = this.state;
    const { registerUser: createUser } = this.props;

    if (email === '' || password === '' || name === '') return;

    createUser({
      email,
      password,
      password2: password,
    });
  }

  responseFacebook = (res) => {
    console.log(res);
  }

  render() {
    const { error } = this.props;
    const errorMessage = (error && error.message && typeof error.message === 'string')
      ? error.message
      : 'Вы ввели неверные данные';

    return (
      <>
        <form onSubmit={this.handleSubmit} className={styles.register_form} >
          <h3>Регистрация</h3>
          <div className={styles.register_name}>
            <label htmlFor="name"><span><img src={userAvatar} alt="lock" width="5%" /></span></label>
            <input
              className={styles.register_boxName}
              type="name"
              name="name"
              placeholder="Имя Фамилия"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <span><img src={this.state.isValidName ? tickTrue : tickFalse} alt="tick" width="5%" /></span>
          </div>
          <div className={styles.register_email}>
            <label htmlFor="email"><span><img src={letterIcon} alt="letter" width="5%" /></span></label>
            <input
              className={styles.register_boxEmail}
              type="email"
              name="email"
              placeholder="Почта"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            <span><img src={this.state.isValidEmail ? tickTrue : tickFalse} alt="tick" width="5%" /></span>
          </div>
          {error && error.type === 'register_error'
            ? (
              <div className={styles.errorLogin}>
                {errorMessage}
              </div>
            ) : null
          }
          <div className={styles.register_password}>
            <label htmlFor="password"><span><img src={lockIcon} alt="lock" width="5%" /></span></label>
            <input
              className={styles.register_boxPassword}
              type={this.state.isVisiblePassword ? 'password' : 'text'}
              name="password"
              placeholder="Пароль"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            <span>
              <input
                type="image"
                onClick={this.visiblePassword}
                className={styles.login_passwordVisible}
                src={this.state.isVisiblePassword ? privateEye : eye}
                alt="lock"
                width="5%"
              />
            </span>
          </div>
          <div className={styles.socialnet_box}>
            <div>
              <button type="button" className={styles.btn}>
                <img src={facebookLogo} alt="facebook_logo" className={styles.btn_img} />
                Facebook
              </button>
            </div>
            <div>
              <a href="https://taskboard.luisi.top/auth/google" className={styles.btn}>
                <img src={googleplusLogo} alt="google_logo" className={styles.btn_img_google} />
                Google
              </a>
            </div>
            <div>
              <button type="button" className={styles.btn}>
                <img src={linkedinLogo} alt="linked_in_logo" className={styles.btn_img} />
                Linked In
              </button>
            </div>
          </div>
          <div className={styles.register_submit}>
            <input type="submit" value="Зарегистрироваться" />
          </div>
        </form>
      </>
    );
  }
}

const mSTP = state => ({
  error: state.session.error,
  auth: state.session.authenticated,
});

const mDTP = (dispatch, ownProps) => ({
  registerUser: credentials => dispatch(registerUser(credentials, ownProps)),
  discardErrors: resetSessionError,
});

export default connect(mSTP, mDTP)(Register);
