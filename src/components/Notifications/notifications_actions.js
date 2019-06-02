/* eslint-disable no-param-reassign */
import moment from 'moment';
import { isValidDate } from '../../utils/formatDate';
import {
  SET_NOTIFICATIONS,
  SET_CURRENT_NOTIFICATION,
  RESET_CURRENT_NOTIFICATION,
} from '../../redux/actionTypes';
import { setTasksReminderShowed } from '../notes_list/note_list_actions';
import { setCurrentModal, openModal } from '../modalManager/modalActions';

let intervalSettingReminders;

export const setCurrentNotification = notification => ({
  type: SET_CURRENT_NOTIFICATION,
  payload: notification,
});

export const resetCurrentNotification = () => ({
  type: RESET_CURRENT_NOTIFICATION,
});


export const setReminders = ({ dates, notifications, dispatch, getState }) => {
  if (!Array.isArray(dates)) return;
  if (dates.length === 0) return;

  const state = getState();

  const isNotificationShowing = state.notifications && state.notifications.notificationToShow;
  const now = new Date();
  const closestReminder = new Date(dates[0]);
  const diff = (closestReminder - now) / 1000 / 60;

  if (diff <= 0 && !isNotificationShowing) {
    clearInterval(intervalSettingReminders);

    const notificationNotes = notifications[dates[0]];

    dispatch(setCurrentNotification(notificationNotes));
    dispatch(setCurrentModal('NOTIFICATION_MODAL'));
    dispatch(openModal());
    dispatch(setTasksReminderShowed(notificationNotes));
  }
};

export const createNotificationsList = () => (dispatch, getState) => {
  const tasks = getState().notes;
  if (Array.isArray(tasks) && tasks.length > 0) {
    const tasksWithReminder = tasks.filter(task =>
      task.reminder && isValidDate(new Date(task.reminder)) && !task.reminderShowed);
    const now = moment();
    const tasksWithReminderGroupedPast = tasksWithReminder.map((task) => {
      if (moment(task.reminder) < now) {
        return { ...task, reminder: now.utc().format() };
      }
      return task;
    });

    const notificationList = tasksWithReminderGroupedPast.reduce((list, task) => {
      if (list[task.reminder]) {
        list[task.reminder] = [
          ...list[task.reminder],
          task,
        ];
      } else {
        list[task.reminder] = [task];
      }
      return list;
    }, {});

    const notificationDates = Object.keys(notificationList);
    notificationDates.sort((a, b) => (
      new Date(a) - new Date(b)
    ));

    clearInterval(intervalSettingReminders);
    intervalSettingReminders = setInterval(() => {
      setReminders({
        dates: notificationDates,
        notifications: notificationList,
        dispatch,
        getState,
      });
    }, 5000);

    dispatch({
      type: SET_NOTIFICATIONS,
      payload: { notificationList, notificationDates },
    });
  }
};
