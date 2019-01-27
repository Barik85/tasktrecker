import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = props => (
  <button className={styles.button} onClick={props.onClick}>{props.text}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
