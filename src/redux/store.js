
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';
import loginReducer from '../components/login/loginReducer';
import { modalOpenReducer, currentModalReducer } from '../components/modalManager/modalReducers';
import { saveStateToLS, getStateFromLS } from '../utils/local_storage';
import notesReducer, { taskToEditReducer } from '../components/notes_list/note_list_reducer';
import notificationsReducer from '../components/Notifications/notifications_reducer';

const rootReducer = combineReducers({
  session: loginReducer,
  isModalOpen: modalOpenReducer,
  currentModal: currentModalReducer,
  notes: notesReducer,
  taskToEdit: taskToEditReducer,
  notifications: notificationsReducer,
});

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const persistedState = getStateFromLS();

const store = createStore(
  rootReducer,
  persistedState,
  enhancer,
);

store.subscribe(throttle(() => {
  const session = store.getState().session;
  (saveStateToLS({
    session: {
      ...session,
      error: null,
    },
  }));
}, 1000));

export default store;
