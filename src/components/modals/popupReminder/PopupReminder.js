import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Close from '../../icons/Close';
import ReminderButton from '../../shared/ReminderButton';
import OkButton from '../../shared/OkButton';
import styles from './PopupReminder.module.scss';
import Pencil from '../../icons/Pencil';
import Bin from '../../icons/Bin';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '36px',
  },
};


const initialState = {
  isOpen: true,
};

export default class PopupReminder extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  state = {
    ...initialState,
  }

  render() {
    const { isModalOpen, closeModal } = this.props;
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className={styles.title}>Напоминание</h2>
        <button onClick={closeModal} className={styles.close}>
          <Close className={styles.closesvg} />
        </button>
        <div className={styles.wrapper}>
          <div className={styles.body}>
            <input type="checkbox" className={styles.input} />
            <div>
              <h3 className={styles.header}>Lorem ipsum dolor sit amet, consec</h3>
              <p className={styles.text}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
              sed diam nonummy nibh euismod </p>
            </div>
          </div>
          <div className={styles.footer}>
            <p className={styles.data}>11/06/2018</p>
            <div>
              <Pencil className={styles.pencil} />
              <Bin className={styles.bin} />
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <ReminderButton text="Напомнить через час" />
          <ReminderButton text="Напомнить завтра" />
          <OkButton text="Ок" />
        </div>
      </Modal>
    );
  }
}
