import React from 'react';
import PropTypes from 'prop-types';
import Note from '../note/Note';
import Button from '../shared/Button';

const styles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90%',
}

const NotesList = ({notes, openModal}) => (
  <div style={styles}>
    {notes.map(note => (<Note key={note.id} note={note} />))}
    <Button text="Добавить задачу" onClick={() => openModal('NEW_TASK_MODAL')} />
  </div>
);

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
}

export default NotesList;
