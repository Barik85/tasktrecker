import { SET_NOTIFICATIONS, SET_CURRENT_NOTIFICATION, RESET_CURRENT_NOTIFICATION } from '../../redux/actionTypes';

const INITIAL_STATE = {
  notificationList: null,
  notificationDates: [],
  notificationToShow: null,
};

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return { ...state, ...action.payload };

    case SET_CURRENT_NOTIFICATION:
      return { ...state, notificationToShow: action.payload };

    case RESET_CURRENT_NOTIFICATION:
      return { ...state, notificationToShow: null };

    default:
      return state;
  }
};

export default notificationsReducer;
