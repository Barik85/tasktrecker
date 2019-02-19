import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import styles from './home.module.scss';
import MainPage from '../mainPage/MainPage';
import ModalManager from '../modalManager/ModalManager';
import NotesList from '../notes_list/note_list_container';

class Home extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    signInWithGoogle: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const userToken = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    if (userToken.token) {
      this.props.signInWithGoogle(userToken.token);
      this.props.history.push('/');
    }
  }

  render() {
    const { authenticated } = this.props;
    return (
      <main className={styles.wrapper}>
        {authenticated ?
          (
            <NotesList />
          ) : (
            <MainPage />
          )
        }
        <ModalManager />
      </main>
    );
  }
}

export default Home;
