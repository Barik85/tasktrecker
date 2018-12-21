import React from 'react';
import styles from './addTask.module.scss';

const AddButton = () => (
    <div className={styles.addButton}>
        <div className={styles.plus}>+</div>
        <p className={styles.title}>Add Task</p>
    </div>
);

export default AddButton;


