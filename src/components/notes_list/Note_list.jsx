import React from 'react';
import PropTypes from 'prop-types';
import Note from '../note/Note';
import AddTask from '../addTask/addTask';



const styles = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90%',
}

export default class NotesList extends React.Component {
  state={
    isOpen: false
  }

  openModalTask = () => {
    this.setState({
      isOpen: true
    })
  }


  render() {
    const { notes } = this.props
    return (<div style={styles}>
      {notes.map(note => (<Note key={note.id} note={note} />))}
      <AddTask openModal={this.openModalTask} {...this.props}/>
    </div>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired
}
