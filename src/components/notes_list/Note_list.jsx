import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from '../note/Note';
import { subscribeToTimer } from '../../utils/apiSocket';
import styles from './addTask.module.scss';

const styless = {
  display: 'flex',
  jusifyContent: 'flex-start',
  marginLeft: 'auto',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90%',
};

export default class Notelist extends Component {
  static propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
    openModal: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notes: [],
  }

  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({ timestamp }));
  }

  state = { timestamp: 'no timestamp yet' }

  componentDidMount() {
    const { getTasks } = this.props;
    getTasks();
  }

  delTask = (id) => {
    const { getTasks, deleteTask } = this.props;
    deleteTask(id);
    getTasks();
  }

  render() {
    const { notes, openModal, ...rest } = this.props;
    return (
      <div style={styless}>
        <p>{this.timestamp}</p>
        {(notes && notes.length > 0)
          ? notes.map(note => (
            <Note
              key={note._id} // eslint-disable-line
              note={note}
              {...rest}
              openModal={openModal}
              DT={this.delTask}
            />
          ))
          : (
            <div>
              <p className={styles.text}>Пока что ничего не создано</p>
            </div>
          )
        }
        <div className={styles.addButton}>
          <button onClick={() => openModal('TASK_EDITOR_MODAL')}>
            <div className={styles.plus}>+</div>
            <div className={styles.text}>Add task</div>
          </button>
        </div>
      </div>
    );
  }
}
