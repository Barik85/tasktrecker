import React from 'react';
import PropTypes from 'prop-types';
import styles from './addTask.module.scss';

const AddTask = ({ openModal }) =>
    (
        <div className={styles.addButton}>
            <button className={styles.plus} onClick={() => openModal("NEW_TASK_MODAL")}> + </button>
            <button onClick={() => openModal("NEW_TASK_MODAL")}> Add task </button>
        </div>
    );

AddTask.propTypes = {
    openModal: PropTypes.func.isRequired,
};

export default AddTask;
