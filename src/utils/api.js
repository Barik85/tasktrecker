import axios from 'axios';

const HOST = 'https://taskboard.luisi.top';

export const googleAuthorisation = token => (
  axios.get(`${HOST}/users/me`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
);

export const registerUser = ({ name, email, password }) => (
  axios.post(`${HOST}/auth/register`,
    {
      name,
      email,
      password,
    },
  )
);

export const loginUser = ({ email, password }) => (
  axios.post(`${HOST}/auth/local/login`,
    {
      email,
      password,
    },
  )
);

export const getUserInfo = token => (
  axios.get(`${HOST}/users/me`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
);

export const getAllTasks = token => (
  axios.get(`${HOST}/tasks`,
    { headers: { Authorization: `Bearer ${token}` } })
);

export const requestCreateTask = ({ token, task }) => (
  axios.post(
    `${HOST}/tasks/add`,
    task,
    { headers: { Authorization: `Bearer ${token}` } },
  )
);

export const requestUpdateTask = ({ token, task }) => (
  axios.put(
    `${HOST}/tasks/${task.id}`,
    task,
    { headers: { Authorization: `Bearer ${token}` } },
  )
);

export const editUser = ({ id, name, email, token }) => (
  axios.put(`${HOST}/users/${id}`,
    {
      name,
      email,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
);
