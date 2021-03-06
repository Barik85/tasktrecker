import {
  GET_TASKS,
  CREATED_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASK_TO_EDIT,
  RESET_TASK_TO_EDIT,
} from '../../redux/actionTypes';


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

    case DELETE_TASK: {
      const deleteNote = action.payload;
      return state.filter(note => (
            note._id !== deleteNote._id // eslint-disable-line
      ));
    }
    case UPDATE_TASK: {
      const updatedNote = action.payload;

      return state.map(note => (
        note._id === updatedNote._id // eslint-disable-line
          ? updatedNote
          : note
      ));
    }

    default:
      return state;
  }
};

export const taskToEditReducer = (state = null, action) => {
  switch (action.type) {
    case SET_TASK_TO_EDIT:
      return action.payload;

    case RESET_TASK_TO_EDIT:
      return null;

    default:
      return state;
  }
};

export default notesReducer;
