import React from 'react';
import { connect } from 'react-redux';
import NewTaskModal from "../modals/newTaskModal/NewTaskModal";
import { closeModal } from "./modalActions";

const ModalManager = ({ currentModal, ...props }) => {
  switch (currentModal) {
    case 'NEW_TASK_MODAL':
      return <NewTaskModal { ...props }/>;
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

