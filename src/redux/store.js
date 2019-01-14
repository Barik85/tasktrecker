
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';
import loginReducer from '../components/login/loginReducer';
import { modalOpenReducer, currentModalReducer } from '../components/modalManager/modalReducers';
import { saveStateToLS, getStateFromLS } from '../utils/local_storage';

const rootReducer = combineReducers({
  session: loginReducer,
  isModalOpen: modalOpenReducer,
  currentModal: currentModalReducer,
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

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const persistedState = getStateFromLS();

const store = createStore(
  rootReducer,
  persistedState,
  enhancer,
);

store.subscribe(throttle(() => {
  (saveStateToLS({
    session: store.getState().session,
  }));
}, 1000));

export default store;
