import React from 'react';
import styles from './addTask.module.scss';
// import Button from '../shared/Button'

const AddButton = () => (
    <div className={styles.addButton} >
        <div className={styles.plus}>+</div>
        <button>Add task</button>
    </div>
);

export default AddButton;