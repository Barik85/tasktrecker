import jwt from 'jwt-simple';
import users from './fakeData.json';

const SECRET = 'jquery_is_amazing';

export const createUser = ({ name, email, password }) => new Promise((resolve, reject) => {
  const user = users.find(item => item.email === email);

  setTimeout(() => {
    if (user) reject('User with current email already exists!');

    const newUser = {
      name,
      email,
      password,
      jwt_token: jwt.encode(password, SECRET),
    };

    users.push(newUser);

    resolve({
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      token: newUser.jwt_token,
    });
  }, 300);
});


export const signIn = ({ email, password }) => new Promise((resolve, reject) => {
  const user = users.find(item => item.email === email);

  setTimeout(() => {
    if (!user) {
      reject('User does not exist!');
      return;
    }

    if (user.password !== password) {
      reject('Invalid password!');
      return;
    }

    user.jwt_token = jwt.encode(user.password, SECRET);

    resolve({
      user: {
        name: user.name,
        email: user.email,
      },
      token: user.jwt_token,
    });
  }, 300);
});


export const signOut = () => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, 300);
});
