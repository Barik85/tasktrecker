import { combineReducers } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL, CURRENT_MODAL } from '../../redux/actionTypes';


const initialState = {
  isModalOpen: false,
  currentModal: null,
};

const modalOpenReducer = (state = initialState.isModalOpen, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return false;

    case OPEN_MODAL:
      return true;

    default:
      return state;
  }
};

const currentModalReducer = (state = initialState.currentModal, action) => {
  switch (action.type) {
    case CURRENT_MODAL:
      return action.payload;

    case CLOSE_MODAL:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  isModalOpen: modalOpenReducer,
  currentModal: currentModalReducer
})
