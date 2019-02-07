import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  GET_USER_SUCCESS,
  RESET_SESSION_ERROR,
} from '../../redux/actionTypes';
import * as api from '../../utils/api';


export const signIn = credentials => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });

  api.loginUser(credentials).then(
    (res) => {
      if (res.status === 200) {
        const userData = res.data && res.data.userData;

        const user = {
          name: userData.name,
          id: userData.id,
          email: userData.email,
        };

        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: {
            user,
            token: userData.token,
          },
        });
      }
    },
    error => dispatch({
      type: SIGN_IN_FAILURE,
      payload: {
        type: 'login_error',
        message: error.response.data.message,
      },
    }),
  );
};

export const signOut = () => dispatch => dispatch({
  type: SIGN_OUT,
});

export const registerUser = (credentials, ownProps) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  return api.registerUser(credentials).then(
    (res) => {
      if (res.status === 200) {
        const data = res.data && res.data.dataUser;
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: {
            user: {
              name: data.name,
              email: data.email,
              id: data.id,
            },
            token: data.token,
          },
        });
        const { history } = ownProps;
        if (history) history.push('/');
      }
    },
    (error) => {
      dispatch({
        type: SIGN_IN_FAILURE,
        payload: {
          type: 'register_error',
          message: error.response.data.info,
        },
      });
    },
  );
};

export const signInWithGoogle = token => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  api.googleAuthorisation(token)
    .then((res) => {
      if (res.status === 200) {
        const userData = res.data && res.data.userData;

        if (userData) {
          const user = {
            name: userData.name,
            id: userData.id,
            email: userData.email,
          };

          dispatch({
            type: SIGN_IN_SUCCESS,
            payload: {
              user,
              token,
            },
          });
        }
      }
    })
    .catch((err) => {
      console.log(`${err}. Ypps...check how to use correct token in your request!`);
    });
};

export const getUserInfo = () => (dispatch, getState) => {
  const { session } = getState();
  const token = session && session.token;
  if (token) {
    return api.getUserInfo(token).then(
      (res) => {
        const userData = res.data && res.data.userData;

        if (userData) {
          const user = {
            name: userData.name,
            id: userData.id,
            email: userData.email,
          };

          dispatch({
            type: GET_USER_SUCCESS,
            payload: user,
          });
        }
      },
      error => dispatch({ type: SIGN_IN_FAILURE, payload: error }),
    );
  }
  return null;
};

export const resetSessionError = () => ({ type: RESET_SESSION_ERROR });
