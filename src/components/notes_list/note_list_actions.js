import { getAllTasks, requestCreateTask, requestUpdateTask } from '../../utils/api';
import {
  GET_TASKS,
  CREATED_TASK,
  UPDATE_TASK,
  SET_TASK_TO_EDIT,
  RESET_TASK_TO_EDIT,
} from '../../redux/actionTypes';

export const getTasks = () => (dispatch, getState) => {
  const token = getState().session.token;
  if (token) {
    getAllTasks(token).then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
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
