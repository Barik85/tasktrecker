
import { createStore, combineReducers } from 'redux';
import loginReducer from '../components/login/loginReducer'

const rootReduser = combineReducers({
  is_auth: loginReducer,

  // user: {
  //   id: '',
  //   name: '',
  //   surname: '',
  //   password: ''
  // },

  // tasks: [
  //   {
  //     id: '',
  //     title: '',
  //     text: '',
  //     createdDate: '',
  //     deadline: '',
  //     notificationTime: '',
  //     color: ''
  //   }
  // ]
});

/* eslint-disable no-underscore-dangle */
 const store = createStore(
  rootReduser, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
/* eslint-enable */

export default store;
