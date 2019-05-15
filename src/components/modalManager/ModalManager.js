import React from 'react';
import { connect } from 'react-redux';
import TaskEditorModal from '../modals/Task_editor_modal/task_editor_container';
import ForgottenPasswordModal from '../modals/Forgotten_password_modal/ForgottenPasswordModal';
import { closeModal } from './modalActions';

const ModalManager = ({ currentModal, ...props }) => {
  switch (currentModal) {
    case 'TASK_EDITOR_MODAL':
      return <TaskEditorModal {...props} />;
    case 'FORGOTTEN_PASSWORD':
      return <ForgottenPasswordModal {...props} />;
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
