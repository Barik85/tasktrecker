import { IS_AUTH } from '../../redux/actionTypes';

const initialState = false;

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case IS_AUTH:
      return !state;
    default:
      return state;
  }
}
