import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Close from '../../icons/Close';
import BellIcon from '../../icons/Bell';

import Note from '../../note/Notification_note';

import styles from './notification_modal.module.scss';
import { notificationModalStyles } from '../modal_styles';

class NotificationModal extends Component {
  static propTypes = {
    notes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    resetCurrentNotification: PropTypes.func.isRequired,
  };

  state = { notes: this.props.notes }

  componentWillUnmount() {
    const { resetCurrentNotification } = this.props;
    resetCurrentNotification();
  }

  setDownOneHour = (task) => {
    const { setDownTaskReminder, closeModal } = this.props;
    const { notes } = this.state;

    setDownTaskReminder({ task, hoursToAdd: 1 });
    if (notes && notes.length <= 1) closeModal();
    else this.removeTaskFromModal(task);
  }

  setDownOneDay = (task) => {
    const { setDownTaskReminder, closeModal } = this.props;
    const { notes } = this.state;

    setDownTaskReminder({ task, hoursToAdd: 24 });
    if (notes && notes.length <= 1) closeModal();
    else this.removeTaskFromModal(task);
  }

  removeTaskFromModal = (task) => {
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note._id !== task._id),
    }));
  }

  render() {
    const {
      isModalOpen, closeModal,
      resetCurrentNotification, ...rest
    } = this.props;

    const { notes } = this.state;

    const handleCloseModal = () => {
      closeModal();
      resetCurrentNotification();
    };

    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={notificationModalStyles}
      >
        <button onClick={handleCloseModal} className={styles.close}>
          <Close className={styles.closesvg} />
        </button>
        <h3 className={styles.title}>
          <BellIcon className={styles.bell_icon} />
          Напоминание
        </h3>
        <div className={styles.notes_wrapper}>
          {(notes && notes.length > 0)
            ? notes.map(note => (
              <Note
                key={note._id}
                note={note}
                backgroundColor="#f1f2f2"
                setDownOneHour={this.setDownOneHour}
                setDownOneDay={this.setDownOneDay}
                {...rest}
              />
            ))
            : null
          }
        </div>
      </Modal>
    );
  }
}

export default NotificationModal;
