import axios from 'axios';

export const getGoogleAuthUser = () => {
  axios.get('https://taskboard.luisi.top/auth/google')
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err)
  })
}

export const sendUser = () => {};
