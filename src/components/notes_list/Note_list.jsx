
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from '../note/Note';
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

  componentDidMount() {
    const { getTasks } = this.props;
    getTasks();
  }

  delTask = (id) => {
    console.log(id);
    console.log(2);
    const { getTasks, deleteTask } = this.props;
    deleteTask(id);
    getTasks();
  }

  render() {
    const { notes, openModal } = this.props;
    return (
      <div style={styless}>
        {(notes && notes.length > 0)
          ? notes.map(note => (<Note key={note.id} note={note} DT={this.delTask} />))
          : (
            <div>
              <p className={styles.text}>Пока что ничего не создано</p>
            </div>
          )
        }
        <div className={styles.addButton}>
          <button onClick={() => openModal('NEW_TASK_MODAL')} >
            <div className={styles.plus}>+</div>
            <div className={styles.text}>Add task</div>
          </button>
        </div>
      </div>
    );
  }
}
