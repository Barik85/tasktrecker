import React from 'react';
import styles from './addTask.module.scss';
import Button from '../shared/Button'

const AddButton = () => (
    <div className={styles.addButton} >
        <div className={styles.plus}>+</div>
        <Button text="Add Task"/>
    </div>
);

export default AddButton;


