import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn, resetSessionError } from './loginActions';
import styles from './login.module.scss';
import lockIcon from './img/blocked-padlock.svg';
import letterIcon from './img/letter.svg';
import tickFalse from './img/tick.svg';
import tickTrue from './img/tickTrue.svg';
import privateEye from './img/private.svg';
import eye from './img/eye.svg';
import facebookLogo from './img/facebook-logo.svg';
import googleplusLogo from './img/google-plus.svg';
import linkedinLogo from './img/linkedin-logo.svg';


const initialState = {
  email: '',
  password: '',
};

class Login extends Component {
  static propTypes = {
    signIn: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    auth: PropTypes.bool,
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

  state = { ...initialState, isValidEmail: true, isVisiblePassword: true };

  componentDidUpdate() {
    if (this.props.auth) {
      this.props.history.push('/');
    }
  }

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
    const { email, password } = this.state;

    if (email === '' || password === '') return;

    this.props.signIn({ ...this.state });
    // this.resetState();
  }

  render() {
    const { error } = this.props;
    const errorMessage = (error && error.message && typeof error.message === 'string')
      ? error.message
      : 'Вы ввели неверные данные';

    return (
      <>
        <form className={styles.login} onSubmit={this.handleSubmit}>
          <h3>Вход</h3>
          <div className={styles.login_inputEmail}>
            <label htmlFor="email"><span><img src={letterIcon} alt="letter" width="5%" /></span></label>
            <input
              className={styles.login_box}
              type="email"
              name="email"
              placeholder="Почта"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            <span><img src={this.state.isValidEmail ? tickTrue : tickFalse} alt="tick" width="5%" /></span>
          </div>
          <div className={styles.login_inputPassword}>
            <label htmlFor="password"><span><img src={lockIcon} alt="lock" width="5%" /></span></label>
            <input
              className={styles.login_box}
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
          {error && error.type === 'login_error'
            ? (
              <div className={styles.errorLogin}>
                {errorMessage}
              </div>
            ) : null
          }
          <div className={styles.sub_menu}>
            <div><input type="checkbox" /><span>Запомнить меня</span></div>
            <div>
              <button className={styles.restore_password_link}>Восстановить пароль</button>
            </div>
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
          <div className={styles.login_submit}>
            <input type="submit" value="ВОЙТИ" />
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

const mDTP = { signIn, discardErrors: resetSessionError };

export default connect(mSTP, mDTP)(Login);
