import {connect} from 'react-redux';
import Home from './Home';
import {signOut, signInWithGoogle } from '../login/loginActions';

const mSTP = state => ({
  authenticated: state.session.authenticated,
  userName: state.session.user.name,
});

const mDTP = dispatch => ({
  handleLogout: () => dispatch(signOut()),
  signInWithGoogle: (token) => dispatch(signInWithGoogle(token)),
});

export default connect(mSTP, mDTP)(Home);
