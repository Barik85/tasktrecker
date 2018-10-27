import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NotFoundPage from '../pages/NotFoundPage';
import Login from './login/Login';
import Home from '../pages/Home';
import Header from './header/headerContainer';
import ProtectedRoute from './shared/ProtectedRoute';
import Profile from '../pages/Profile';
import Register from '../components/register/Register';

const App = ({auth}) => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <ProtectedRoute exact path="/profile" component={Profile} authenticated={auth} redirectTo="/login" />
      <Route component={NotFoundPage} />
    </Switch>
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
