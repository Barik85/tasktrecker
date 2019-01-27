import axios from 'axios';

const HOST = 'https://taskboard.luisi.top';

export const googleAuthorisation = token => (
  axios.get(`${HOST}/users/me`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
);

export const registerUser = ({ email, password }) => (
  axios.post(`${HOST}/auth/register`,
    {
      email,
      password,
      password2: password, // will be removed after api fixed
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
