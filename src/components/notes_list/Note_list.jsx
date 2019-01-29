
import React from 'react';
import PropTypes from 'prop-types';
import Note from '../note/Note';
import styles from './addTask.module.scss';

const styless = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90%',
};

const Notelist = ({ notes, openModal }) => (
  <div style={styless}>
    {notes.map(note => (<Note key={note.id} note={note} />))}
    <div className={styles.addButton}>
      <button onClick={() => openModal('NEW_TASK_MODAL')}>
        <div className={styles.plus}>+</div>
        <div className={styles.text}>Add task</div>
      </button>
    </div>
  </div>
);

Notelist.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Notelist;
