import {connect} from 'react-redux';
import Home from './Home';
import {signOut} from '../../components/login/loginActions';
import { setCurrentModal, openModal } from '../modalManager/modalActions';

const mSTP = state => ({
  authenticated: state.session.authenticated,
  userName: state.session.user.name,
});

const mDTP = dispatch => ({
  handleLogout: () => dispatch(signOut()),
  openModal: (modalName) => {
    dispatch(setCurrentModal(modalName));
    dispatch(openModal());
  },
});

export default connect(mSTP, mDTP)(Home);
