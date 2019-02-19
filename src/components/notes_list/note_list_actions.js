import { getAllTasks, requestCreateTask } from '../../utils/api';
import { GET_TASKS, CREATED_TASK } from '../../redux/actionTypes';

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
    return requestCreateTask(token, task).then((res) => {
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
