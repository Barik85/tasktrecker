import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from './loginActions';
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
          {error ? (<div className={styles.errorLogin}>Вы ввели неверные данные</div>) : null}
          <div className={styles.subMenu}>
            <div><input type="checkbox" /><span>Запомнить меня</span></div>
            <div><a href="http://">Восстановить пароль</a></div>
          </div>
          <div className={styles.socialnetBox}>
            <div><button type="button"><img src={facebookLogo} alt="lock" width="20%" />Facebook</button></div>
            <div><button type="button"><img src={googleplusLogo} alt="lock" width="20%" />Google</button></div>
            <div><button type="button"><img src={linkedinLogo} alt="lock" width="20%" />Linked In</button></div>
          </div>
          <div className={styles.login_submit}>
            <input type="submit" value="ВОЙТИ" />
          </div>
        </form>
        <div>
          <a href="https://taskboard.luisi.top/auth/google">Login with google account</a>
        </div>
      </>
    );
  }
}

const mSTP = state => ({
  error: state.session.error,
  auth: state.session.authenticated,
});

const mDTP = { signIn };

export default connect(mSTP, mDTP)(Login);
