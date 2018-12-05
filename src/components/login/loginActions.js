import { SIGN_IN_REQUEST, SIGN_IN_SUCCES, SIGN_IN_FAILURE, SIGN_OUT } from '../../redux/actionTypes';
import * as api from '../../fakeApi';
import { googleAuthorisation } from '../../utils/api';


export const signIn = (credentials) => dispatch => {
  dispatch({type: SIGN_IN_REQUEST});

  api.signIn(credentials).then(
    res => dispatch({type: SIGN_IN_SUCCES, payload: res}),
    error => dispatch({type: SIGN_IN_FAILURE, payload: error})
  )
};

export const signOut = () => dispatch => dispatch({
  type: SIGN_OUT
});

export const registerUser = (credentials) => dispatch => {
  dispatch({type: SIGN_IN_REQUEST});

  api.createUser(credentials).then(
    res => dispatch({type: SIGN_IN_SUCCES, payload: res}),
    error => dispatch({type: SIGN_IN_FAILURE, payload: error})
  )
};

export const signInWithGoogle = (token) => dispatch => {
  dispatch({type: SIGN_IN_REQUEST});

  googleAuthorisation(token)
    .then((response) => {
      const data = response.data[0];
      dispatch({
        type: SIGN_IN_SUCCES,
        payload: {
          token,
          user: {
            email: data.email,
            name: data.firstName,
            surname: data.lastName,
          }
        },
      });
    })
    .catch((err) => {
        console.log(`${err}. Ypps...check how to use correct token in your request!`)
    });
};
