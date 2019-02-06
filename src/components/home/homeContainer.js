import { connect } from 'react-redux';
import { setCurrentModal, openModal } from '../modalManager/modalActions';
import { signOut, signInWithGoogle } from '../login/loginActions';
import Home from './Home';

const mSTP = state => ({
  authenticated: state.session.authenticated,
  userName: state.session.user.name,
  token: state.session.token,
});

const mDTP = dispatch => ({
  handleLogout: () => dispatch(signOut()),
  openModal: (modalName) => {
    dispatch(setCurrentModal(modalName));
    dispatch(openModal());
  },
  signInWithGoogle: token => dispatch(signInWithGoogle(token)),
});

export default connect(mSTP, mDTP)(Home);
