import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Note from '../note/Note';
import styles from './addTask.module.scss';

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

  render() {
    const { notes, openModal, deleteTask, ...rest } = this.props;
    return (notes && notes.length === 0)
      ? (
        <Fragment>
          <p className={styles.text}>Пока что ничего не создано</p>
          <div className={`${styles.addButton} ${styles.in_center}`}>
            <button onClick={() => openModal('TASK_EDITOR_MODAL')}>
              <div className={styles.plus}>+</div>
              <div className={styles.text}>Добавить задачу</div>
            </button>
          </div>
        </Fragment>
      ) : (
        <div className={styles.list_container}>
          {(notes && notes.length > 0)
            ? notes.map(note => (
              <Note
                key={note._id} // eslint-disable-line
                note={note}
                {...rest}
                openModal={openModal}
                onDelete={deleteTask}
              />
            ))
            : null
          }
          <div className={styles.addButton}>
            <button onClick={() => openModal('TASK_EDITOR_MODAL')}>
              <div className={styles.plus}>+</div>
              <div className={styles.text}>Добавить задачу</div>
            </button>
          </div>
        </div>
      );
  }
}
