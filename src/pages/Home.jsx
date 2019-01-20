import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import { signInWithGoogle } from '../components/login/loginActions';
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

class Home extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    signInWithGoogle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const userToken = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

    if (userToken.token) {
        this.props.signInWithGoogle(userToken.token);
        this.props.history.push("/");
    }

  }

  render() {
    return (
      <div>
        <Note note={fakeNote}/>
      </div>
    );
  }
}

const mDTP = dispatch => ({
  signInWithGoogle: (token) => dispatch(signInWithGoogle(token)),
})

export default connect(null, mDTP)(Home);
