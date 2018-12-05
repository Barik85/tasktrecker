import axios from 'axios';

export const googleAuthorisation = (token) => (
  axios.get('https://taskboard.luisi.top/users/me',
    {headers: {"Authorization": `Bearer ${token}`}} )
);

export const sendUser = () => {};
