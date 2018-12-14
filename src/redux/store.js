
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import loginReducer from '../components/login/loginReducer';
import { modalOpenReducer, currentModalReducer } from '../components/modalManager/modalReducers';

const rootReducer = combineReducers({
  session: loginReducer,
  isModalOpen: modalOpenReducer,
  currentModal: currentModalReducer
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
