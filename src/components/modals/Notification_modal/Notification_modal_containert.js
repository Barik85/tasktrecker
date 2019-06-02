import { connect } from 'react-redux';
import NotificationModal from './Notification_modal';
import { resetCurrentNotification } from '../../Notifications/notifications_actions';
import { setAndOpenModal } from '../../modalManager/modalActions';
import {
  setTaskToEdit,
  updateTask,
  deleteTask,
  setDownTaskReminder,
} from '../../notes_list/note_list_actions';

const mSTP = state => ({
  notes: state.notifications.notificationToShow,
});

const mDTP = {
  resetCurrentNotification,
  setTaskToEdit,
  updateTask,
  onDelete: deleteTask,
  openModal: setAndOpenModal,
  setDownTaskReminder,
};

export default connect(mSTP, mDTP)(NotificationModal);
