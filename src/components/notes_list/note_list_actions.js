import {
  getAllTasks,
  requestCreateTask,
  requestUpdateTask,
  requestDeleteTask,
} from '../../utils/api';

import {
  GET_TASKS,
  CREATED_TASK,
  UPDATE_TASK,
  SET_TASK_TO_EDIT,
  RESET_TASK_TO_EDIT,
  DELETE_TASK,
} from '../../redux/actionTypes';

import { createNotificationsList } from '../Notifications/notifications_actions';

export const getTasks = () => (dispatch, getState) => {
  const token = getState().session.token;
  if (token) {
    getAllTasks(token).then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
      dispatch(createNotificationsList());
    });
  }
};

export const createTask = task => (dispatch, getState) => {
  const token = getState().session.token;
  if (token) {
    return requestCreateTask({ token, task }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: CREATED_TASK,
          payload: res.data,
        });
        dispatch(createNotificationsList());
        return res.data;
      }

      return null;
    });
  }
  return null;
};

export const deleteTask = id => (dispatch, getState) => {
  const token = getState().session.token;
  if (token) {
    return requestDeleteTask(token, id).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: DELETE_TASK,
          payload: res.data,
        });
        dispatch(createNotificationsList());
        return res.data;
      }
      return null;
    });
  }
  return null;
};

export const updateTask = task => (dispatch, getState) => {
  const token = getState().session.token;
  if (token) {
    return requestUpdateTask({ token, task }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: UPDATE_TASK,
          payload: res.data,
        });
        dispatch(createNotificationsList());

        return res.data;
      }

      return null;
    });
  }

  return null;
};

export const setTaskToEdit = task => ({
  type: SET_TASK_TO_EDIT,
  payload: task,
});

export const resetTaskToEdit = () => ({
  type: RESET_TASK_TO_EDIT,
});

export const setTasksReminderShowed = tasks => (dispatch) => {
  if (!Array.isArray(tasks)) return null;
  const updatedTasks = tasks.map(task => ({
    ...task,
    id: task._id,
    reminderShowed: true,
  }));
  return (
    Promise.all(updatedTasks.map(task => dispatch(updateTask(task))))
  );
};
