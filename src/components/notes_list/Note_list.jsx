import React from 'react';
import PropTypes from 'prop-types';
import Note from '../note/Note';
import AddButton from '../addTask/index';
import Button from '../shared/Button';
import NewTaskModal from "../modals/newTaskModal/NewTaskModal"


const styles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90%',
}

const NotesList = ({notes}) => (
  <div style={styles}>
    {notes.map(note => (<Note key={note.id} note={note} />))}
    <AddButton/>

    <Button text="Добавить задачу"/>
    <NewTaskModal/>

  </div>
);

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  // openModal: PropTypes.func.isRequired,
}

export default NotesList;
