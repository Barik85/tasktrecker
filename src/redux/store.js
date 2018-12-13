
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import loginReducer from '../components/login/loginReducer';
import modalManager from '../components/modalManager/modalReducers';

const rootReducer = combineReducers({
  session: loginReducer,
  modal: modalManager
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
rootReducer, /* preloadedState, */
enhancer
);

export default store;
