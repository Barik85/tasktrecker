import { connect } from 'react-redux';
import TaskEditor from './TaskEditorModal';
import { createTask, resetTaskToEdit, updateTask } from '../../notes_list/note_list_actions';

const mSTP = state => ({
  taskToEdit: state.taskToEdit,
});
const mDTP = { createTask, resetTaskToEdit, updateTask };

export default connect(mSTP, mDTP)(TaskEditor);
