import { GET_TASKS, CREATED_TASK } from '../../redux/actionTypes';

const INITIAL_STATE = [];

const notesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    case CREATED_TASK:
      return [
        ...state,
        action.payload,
      ];

    default:
      return state;
  }
};

export default notesReducer;
