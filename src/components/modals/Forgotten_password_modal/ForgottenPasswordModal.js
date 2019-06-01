/* eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './ForgottenPasswordModal.module.scss';
import Close from '../../icons/Close';
import letterIcon from '../../login/img/letter.svg';
import facebookLogo from './img/facebook-logo.svg';
import googleplusLogo from '../../login/img/google-plus.svg';
import linkedinLogo from '../../login/img/linkedin-logo.svg';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '25px',
  },
};

const initialState = {
  email: '',
  password: '',
};
export default class ForgottenPasswordModal extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  state = { ...initialState, isValidEmail: true, isVisiblePassword: true };

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

  handleClose = () => {
    this.props.closeModal();
  }


  render() {
    const { isModalOpen, closeModal } = this.props;
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.wrapper} >
          <button onClick={closeModal} className={styles.close}>
            <Close className={styles.closesvg} />
          </button>
          <div className={styles.left}>
            <h3 className={styles.title}>Восстановление пароля</h3>
              <form action="">
                <div className={styles.login_inputEmail}>
                  <p>Введите e-mail для восстановления пароля</p>
                  <label htmlFor="email">
                    <span>
                      <img src={letterIcon} alt="letter" width="5%" />
                    </span>
                  </label>
                  <input
                    className={styles.login_box}
                    type="email"
                    name="email"
                    placeholder="Почта"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                </div>
                <button className={styles.button}>Получить временный пароль</button>
              </form>
              <Link to="/login" className={styles.login_link} onClick={this.handleClose}>Войти </Link>
            </div> 
          <div className={styles.right}>
            <h4 className={styles.title}>Войти как пользователь</h4>
                       
                
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
                  <Link to="/register" className={styles.register_link} onClick={this.handleClose}>Зарегистрироваться </Link>
                </div>
              
          </div>
        </Modal>
    );
  }
}
