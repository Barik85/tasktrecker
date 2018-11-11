import {connect} from 'react-redux';
import Home from './Home';
import {signOut} from '../../components/login/loginActions';

const mSTP = state => ({
  authenticated: state.session.authenticated,
  userName: state.session.user.name,
});

const mDTP = dispatch => ({
  handleLogout: () => dispatch(signOut())
});

export default connect(mSTP, mDTP)(Home);
