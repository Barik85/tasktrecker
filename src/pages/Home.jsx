import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import { signInWithGoogle } from '../components/login/loginActions';

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
    return (<div>
      Hello world from home!
    </div>)
  }
}

const mDTP = dispatch => ({
  signInWithGoogle: (token) => dispatch(signInWithGoogle(token)),
})

export default connect(null, mDTP)(Home);
