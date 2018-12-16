import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../login/loginActions';
import styles from './register.module.scss'
import lockIcon from '../login/img/blocked-padlock.svg';
import letterIcon from '../login/img/letter.svg';
import userAvatar from '../login/img/avatar.svg';
import tickFalse from '../login/img/tick.svg';
import tickTrue from '../login/img/tickTrue.svg'
import privateEye from '../login/img/private.svg';
import eye from '../login/img/eye.svg';
import facebookLogo from '../login/img/facebook-logo.svg';
import googleplusLogo from '../login/img/google-plus.svg';
import linkedinLogo from '../login/img/linkedin-logo.svg';


const initialState = {
  name: '',
  email: '',
  password: ''
}

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
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

  state = { ...initialState, isValidName: true, isValidEmail: true, isVisiblePassword: true};

  componentDidUpdate() {
    if (this.props.auth) {
      this.props.history.push('/');
    }
  }

  resetState = () => {
    this.setState(initialState);
  }

    handleInputChange = (e) => {
    const {value, name} = e.target;

    this.setState({
      [name]: value
    })
      this.validate(name, value)
  };

  validate = (name,value)=>{
    if(name === 'email'){
      const valEmail = /^\S+@\S+\.\S+$/;
      this.setState({
        isValidEmail: valEmail.test(value)
      })
    }else if (name === 'name'){
      const valName = /^[A-z]+$/;
      this.setState({
        isValidName: valName.test(value)
      })
    }
  };

  visiblePassword = (e) => {
    e.preventDefault();
    this.setState({
      isVisiblePassword:!this.state.isVisiblePassword
    })
  };



  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, name} = this.state;

    /* eslint-disable-next-line */
    if (email === '' || password === '' || name === '') return;

    this.props.registerUser({...this.state});
    this.resetState();
  }

  render() {
    const {error} = this.props;

    return(
      <form onSubmit={this.handleSubmit} className={styles.register_form} >
        <h3>Регистрация</h3>
        <div className={styles.register_name}>
          <label htmlFor="name"><span><img src={userAvatar} alt='lock' width="5%" /></span></label>
          <input
            className={styles.register_boxName}
            type="name"
            name="name"
            placeholder="Имя Фамилия"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
          <span><img src={this.state.isValidName ? tickTrue : tickFalse} alt='tick' width="5%" /></span>
        </div>
        <div className={styles.register_email}>
          <label htmlFor="email"><span><img src={letterIcon} alt='letter' width="5%" /></span></label>
          <input
            className={styles.register_boxEmail}
            type="email"
            name="email"
            placeholder="Почта"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <span><img src={this.state.isValidEmail ? tickTrue : tickFalse} alt='tick' width="5%" /></span>
        </div>
        {error ? (<div className={styles.errorLogin}>Вы ввели неверные данные</div>) : null}
        <div className={styles.register_password}>
          <label htmlFor="password"><span><img src={lockIcon} alt='lock' width="5%" /></span></label>
          <input
            className={styles.register_boxPassword}
            type={this.state.isVisiblePassword ? "password" : "text"}
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
            src={this.state.isVisiblePassword?privateEye:eye} alt='lock' width="5%" />
          </span>
        </div>
        <div className={styles.socialnetBox}>
          <div><button type="button" className={styles.socialnetBox_facebook}><img src={facebookLogo} alt='lock' width="20%" />Facebook</button></div>
          <div><button type="button" className={styles.socialnetBox_google}><img src={googleplusLogo} alt='lock' width="20%" />Google</button></div>
          <div><button type="button" className={styles.socialnetBox_linkeid}><img src={linkedinLogo} alt='lock' width="20%" />Linked In</button></div>
        </div>
        <div className={styles.register_submit}>
          <input  type="submit" value="Зарегистрироваться"/>
        </div>
        {error ? (<div>{error}</div>) : null}
      </form>
    );
  }
}

const mSTP = state => ({
  error: state.session.error,
  auth: state.session.authenticated,
})

const mDTP = {registerUser};

export default connect(mSTP, mDTP)(Register);
