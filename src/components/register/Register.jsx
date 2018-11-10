import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../login/loginActions';
import styles from './register.module.scss'

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

  state = {...initialState};

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
          <label htmlFor="name"><span role="img" aria-label="none" >&#128100;</span> </label>
          <input
            type="name"
            name="name"
            placeholder="Имя Фамилия"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
        </div>
        <div className={styles.register_email}>
          <label htmlFor="email"><span>&#9993;</span></label>
          <input
            type="email"
            name="email"
            placeholder="Почта"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
        </div>
        <div className={styles.register_password}>
          <label htmlFor="password"><span role="img" aria-label="none" >&#128275;</span> </label>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
        </div>
        <div className={styles.register_submit}>
          <input  type="submit" value="Регистрация"/>
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
