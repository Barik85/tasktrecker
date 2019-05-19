import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Close from '../../icons/Close';

import Note from '../../note/Note';

import styles from './notification_modal.module.scss';
import customStyles from '../modal_styles';

class NotificationModal extends Component {
  static propTypes = {
    notes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    resetCurrentNotification: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    const { resetCurrentNotification } = this.props;
    resetCurrentNotification();
  }

  render() {
    const {
      notes, isModalOpen, closeModal,
      resetCurrentNotification, ...rest
    } = this.props;

    const handleCloseModal = () => {
      closeModal();
      resetCurrentNotification();
    };

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={handleCloseModal} className={styles.close}>
          <Close className={styles.closesvg} />
        </button>
        <h3 className={styles.title}>Напоминание</h3>
        {(notes && notes.length > 0)
          ? notes.map(note => (
            <Note
              key={note._id}
              note={note}
              backgroundColor="#f1f2f2"
              {...rest}
            />
          ))
          : null
        }
      </Modal>
    );
  }
}

export default NotificationModal;
