import { connect } from 'react-redux';
import NoteList from './Note_list';
import { getTasks } from './note_list_actions';
import { setCurrentModal, openModal } from '../modalManager/modalActions';

const mSTP = state => ({
  notes: state.notes,
});

const mDTP = dispatch => ({
  getTasks: () => { dispatch(getTasks()); },
  openModal: (modalName) => {
    dispatch(setCurrentModal(modalName));
    dispatch(openModal());
  },
});

export default connect(mSTP, mDTP)(NoteList);