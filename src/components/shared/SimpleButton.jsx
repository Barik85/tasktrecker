import React from 'react';
import PropTypes from 'prop-types';
import styles from './simpleButton.module.scss';

const SimpleButton = (props) => (
    <input type="submit" className={styles.button} value={props.text} />
)

SimpleButton.propTypes = {
    text: PropTypes.string.isRequired
}

export default SimpleButton;
