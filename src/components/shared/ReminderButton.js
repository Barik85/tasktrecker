import React from 'react';
import PropTypes from 'prop-types';
import styles from './simpleButton.module.scss';

const ReminderButton = props => (
  <input type="submit" className={styles.reminder} value={props.text} />
);

ReminderButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ReminderButton;
