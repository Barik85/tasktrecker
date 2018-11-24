import React from 'react';
import Note from '../components/note/Note';

const fakeNote = {
  userId: '',
  title: 'Go on shopping and then go back. Lorem ipsum',
  description: 'i wont to by some food.',
  color: '#000',
  deadline: '2019/01/31',
  reminder: '',
  timestamps: {
    createdAt: '',
    updatedAt: ''
  }
};

const Home = () => (
  <div>
    <Note note={fakeNote}/>
  </div>
)

export default Home;
