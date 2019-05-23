import { OPEN_MODAL, CLOSE_MODAL, CURRENT_MODAL } from '../../redux/actionTypes';

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const setCurrentModal = current => ({
  type: CURRENT_MODAL,
  payload: current,
});

export const setAndOpenModal = modalName => (dispatch) => {
  dispatch(setCurrentModal(modalName));
  dispatch(openModal());
};
