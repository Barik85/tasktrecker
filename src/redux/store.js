
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import loginReducer from '../components/login/loginReducer';

const rootReduser = combineReducers({
  session: loginReducer,

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

const enhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(
rootReduser, /* preloadedState, */
enhancer
);

export default store;
