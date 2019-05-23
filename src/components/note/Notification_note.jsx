import React from 'react';
import PropTypes from 'prop-types';

import Note from './Note';
import styles from './note.module.scss';
import buttonStyles from '../../styles/buttons.module.scss';

const NotificationNote = ({ note, setDownOneHour, setDownOneDay, ...rest }) => {
  const handleDownOneHour = () => {
    setDownOneHour(note);
  };

  const handleDownOneDay = () => {
    setDownOneDay(note);
  };

  return (
    <div className={styles.notification_note}>
      <Note note={note} {...rest} />
      <div>
        <button type="button" className={buttonStyles.btn_grey} onClick={handleDownOneHour}>
          Напомнить через час
        </button>
      </div>
      <div>
        <button type="button" className={buttonStyles.btn_grey} onClick={handleDownOneDay}>
          Напомнить завтра
        </button>
      </div>
    </div>
  );
};

NotificationNote.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  setDownOneHour: PropTypes.func.isRequired,
  setDownOneDay: PropTypes.func.isRequired,
};

export default NotificationNote;
