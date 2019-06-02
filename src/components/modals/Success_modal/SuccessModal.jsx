import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Close from '../../icons/Close';

import styles from './success_modal.module.scss';
import customStyles from '../modal_styles';

const SuccessModal = ({ title, text, isModalOpen, closeModal }) => (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    style={customStyles}
  >
    <button onClick={closeModal} className={styles.close}>
      <Close className={styles.closesvg} />
    </button>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.text}>{text}</p>
  </Modal>
);

SuccessModal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

SuccessModal.defaultProps = {
  title: 'Поздравления!',
  text: 'Операция прошла успешно',
};

export default SuccessModal;
