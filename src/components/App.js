import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NotFoundPage from '../pages/NotFoundPage';
import Login from './login/Login';
import Home from './home/homeContainer';
import Header from './header/headerContainer';
import Footer from './footer/footer';
import ProtectedRoute from './shared/ProtectedRoute';
import Profile from '../pages/Profile';
import Register from '../components/register/Register';
import styles from './App.module.scss';
import Note from './note/Note';

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


const App = ({auth}) => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.main_container}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute exact path="/profile" component={Profile} authenticated={auth} redirectTo="/login" />
        <Route path="/note" render={props =>(<Note note={fakeNote} {...props} />)} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <Footer />
  </div>
);


App.propTypes = {
  auth: PropTypes.bool,
}

App.defaultProps = {
  auth: false,
}

const mSTP = (state) => ({
  auth: state.session.authenticated
});

export default withRouter(connect(mSTP)(App));

// export default App;
