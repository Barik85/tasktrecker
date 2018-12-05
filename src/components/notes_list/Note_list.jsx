import React from 'react';
import PropTypes from 'prop-types'
import Note from '../note/Note';

const styles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90%',
}

const NotesList = ({notes}) => (
  <div style={styles}>
    {notes.map(note => (<Note key={note.id} note={note} />))}
  </div>
);

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NotesList;
