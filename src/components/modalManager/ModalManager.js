import React from 'react';
import { connect } from 'react-redux';
import TaskEditorModal from '../modals/Task_editor_modal/task_editor_container';
import SuccessModal from '../modals/Success_modal/SuccessModal';
import NotificationModal from '../modals/Notification_modal/Notification_modal_containert';
import { closeModal } from './modalActions';

const ModalManager = ({ currentModal, ...props }) => {
  switch (currentModal) {
    case 'TASK_EDITOR_MODAL':
      return <TaskEditorModal {...props} />;

    case 'SUCCESS_REGISTER_MODAL':
      return <SuccessModal title="Поздравляем!" text="Вы успешно зарегистрировались" {...props} />;

    case 'NOTIFICATION_MODAL':
      return <NotificationModal {...props} />;

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
