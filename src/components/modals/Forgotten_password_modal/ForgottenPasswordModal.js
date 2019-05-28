import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Close from '../../icons/Close';
// import letterIcon from '../../login/img/letter.svg';
// import SimpleButton from '../../shared/SimpleButton';
import styles from './ForgottenPasswordModal.module.scss';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '25px',
  },
};


const ForgottenPasswordModal = props => (
  <Modal
    isOpen={props.isModalOpen}
    onRequestClose={this.handleCloseModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <h3>Восстановление пароля</h3>
    <button onClick={this.handleCloseModal} className={styles.close}>
      <Close className={styles.closesvg} />
    </button>
    <h4>Войти как пользователь</h4>
    {/* <div>
      <div>
        <form action="">
          <div className={styles.login_inputEmail}>
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
          <SimpleButton text="Получить временный пароль" className={styles.saveButton} />
        </form>
      </div>
      <div>
        <button>Facebook</button>
        <button>Google</button>
        <Link to="/register" className={styles.button}>Зарегистрироваться </Link>
      </div>
    </div> */}
  </Modal>
);


ForgottenPasswordModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
};

export default ForgottenPasswordModal;
