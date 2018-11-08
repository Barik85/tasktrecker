import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = (props) => (
    <button className={styles.button}>{props.text}</button>
)

Button.propTypes = {
    text: PropTypes.string.isRequired
}

export default Button;
