import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({user}) => (
  <div>
    <div>
      <span>Имя фамилия</span> <span>{user.name}</span>
    </div>
    <div>
      <span>Электронная почта</span> <span>{user.email}</span>
    </div>
  </div>
);

Profile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

Profile.defaultProps = {
  user: {
    email: '',
    name: '',
  }
};

const mSTP = (state) => ({
  user: state.session.user
})

export default connect(mSTP)(Profile);
