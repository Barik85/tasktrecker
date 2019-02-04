import React from 'react';
import { connect } from 'react-redux';
import NewTaskModal from '../modals/newTaskModal/NewTaskModal';
import PopupReminder from '../modals/popupReminder/PopupReminder';
import { closeModal } from './modalActions';

const ModalManager = ({ currentModal, ...props }) => {
  switch (currentModal) {
    case 'NEW_TASK_MODAL':
      return <NewTaskModal {...props} />;
    case 'POPUP_REMINDER':
      return <PopupReminder {...props} />;
    default:
      return null;
  }
};

const mSTP = state => ({
  currentModal: state.currentModal,
  isModalOpen: state.isModalOpen,
});

const mDTP = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(ModalManager);

