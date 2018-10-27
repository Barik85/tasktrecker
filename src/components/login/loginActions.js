/* eslint-disable */
import { SIGN_IN_REQUEST, SIGN_IN_SUCCES, SIGN_IN_FAILURE, SIGN_OUT } from 'redux/actionTypes';
import * as api from 'fakeApi';


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
