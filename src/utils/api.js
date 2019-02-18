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

export const getTasks = token => (
  axios.get('https://taskboard.luisi.top/tasks',
    { headers: { Authorization: `Bearer ${token}` } })
);
