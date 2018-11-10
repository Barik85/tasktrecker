import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from './loginActions';
import styles from './login.module.scss'

const initialState = {
  email: '',
  password: ''
}

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
    const {email, password} = this.state;

    /* eslint-disable-next-line */
    if (email === '' || password === '') return;

    this.props.signIn({...this.state});
    this.resetState();
  }

  render() {
    const {error} = this.props;

    return(
      <form className={styles.Login} onSubmit={this.handleSubmit}>
        <h3>Вход</h3>
        <div className={styles.Login_inputEmail}>
          <label htmlFor="email"><span>&#9993;</span></label>
          <input
            type="email"
            name="email"
            placeholder="Почта"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
        </div>
        <div className={styles.Login_inputPassword}>
          <label  htmlFor="password"><span role="img" aria-label="none" >&#128275;</span></label>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
        </div>
        <div className={styles.Login_submit}>
          <input type="submit" value="ВОЙТИ"/>
        </div>
        {error ? (<div>{error}</div>) : null}
      </form>
    );
  }
}

const mSTP = state => ({
  error: state.session.error,
  auth: state.session.authenticated
})

const mDTP = {signIn};

export default connect(mSTP, mDTP)(Login);
