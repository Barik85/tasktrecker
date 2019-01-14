import { combineReducers } from 'redux';
import {
  SIGN_IN_REQUEST, SIGN_IN_SUCCES, SIGN_IN_FAILURE, SIGN_OUT,
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
    case SIGN_IN_SUCCES:
      return action.payload.user;

    case SIGN_OUT:
      return {
        user: initialState.user,
      };

    default:
      return state;
  }
};

const authenticatedReducer = (state = initialState.authenticated, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCES:
      return true;

    case SIGN_OUT:
      return false;

    default:
      return state;
  }
};

const tokenReducer = (state = initialState.token, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCES:
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

    case SIGN_IN_SUCCES:
    case SIGN_IN_REQUEST:
    case SIGN_OUT:
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
