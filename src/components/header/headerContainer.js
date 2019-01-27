import { connect } from 'react-redux';
import Header from './header';
import { signOut, getUserInfo } from '../login/loginActions';

const mSTP = state => ({
  authenticated: state.session.authenticated,
  userName: state.session.user.name,
});

const mDTP = dispatch => ({
  handleLogout: () => dispatch(signOut()),
  getUserInfo: () => dispatch(getUserInfo()),
});

export default connect(mSTP, mDTP)(Header);
