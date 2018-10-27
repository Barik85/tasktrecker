import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotFoundPage = (props) => (
  <div>
    Sorry, page {props.location.pathname.substring(1)} not found.
    Go to <Link to="/">Main page</Link>
  </div>
);

NotFoundPage.propTypes = {
  location: PropTypes.shape(),
}

NotFoundPage.defaultProps = {
  location: null
}

export default NotFoundPage;
