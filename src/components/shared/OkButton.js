import React from 'react';
import PropTypes from 'prop-types';
import styles from './simpleButton.module.scss';

const OkButton = props => (
  <input type="submit" className={styles.ok} value={props.text} />
);

OkButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default OkButton;
