import { connect } from 'react-redux';
import TaskEditor from './NewTaskModal';
import { createTask } from '../../notes_list/note_list_actions';

const mDTP = { createTask };

export default connect(null, mDTP)(TaskEditor);
