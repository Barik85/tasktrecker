import { combineReducers } from 'redux';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  GET_USER_SUCCESS,
  RESET_SESSION_ERROR,
} from '../../redux/actionTypes';

const initialState = {
  user: {
    id: '',
    name: '',
    surname: '',
  },
  authenticated: false,
  token: null,
  error: null,
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return action.payload.user;

    case SIGN_OUT:
    case SIGN_IN_FAILURE:
      return initialState.user;

    case GET_USER_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

const authenticatedReducer = (state = initialState.authenticated, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return true;

    case SIGN_OUT:
    case SIGN_IN_FAILURE:
      return false;

    default:
      return state;
  }
};

const tokenReducer = (state = initialState.token, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return action.payload.token;

    case SIGN_OUT:
      return initialState.token;

    default:
      return state;
  }
};

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case SIGN_IN_FAILURE:
      return action.payload;

    case SIGN_IN_SUCCESS:
    case SIGN_IN_REQUEST:
    case GET_USER_SUCCESS:
    case SIGN_OUT:
    case RESET_SESSION_ERROR:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  authenticated: authenticatedReducer,
  token: tokenReducer,
  error: errorReducer,
});
