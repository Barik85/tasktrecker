import React from 'react';
import PropTypes from 'prop-types';
import styles from './colorPicker.module.scss';

const colors = ['#ed1c24', '#ff4081', '#e040fb', '#7c4dff', '#03a9f4', '#00bcd4', '#009688', '#8bc34a', '#ffc107'];

const ColorPicker = props =>  {

  const pickedColor = (e, color) => {
        e.preventDefault();
        props.onSelectColor(color)
    };
        return(
            <div className={styles.wrapper}>
                <button className={styles.button} onClick={(e) => pickedColor(e, 'Без цвета')} />
                {colors.map( color => (<button className={styles.button} style={{background: color}} key={color} onClick={(e) => pickedColor(e, color)}/>))}
            </div>
        )
    };

ColorPicker.propTypes = {
    onSelectColor: PropTypes.func.isRequired
};

export default ColorPicker;
