import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mainpage.module.scss';

const MainPage = () => (
  <div>
    <p className={styles.description}>
      Тасктрекер - приложение которое помогает контролировать свои дела.
      Чтобы продолжить войдите или зарегистрируйтесь.
    </p>
    <div className={styles.action}>
      <Link to="/login" className={styles.button}>Войти </Link>
      <Link to="/register" className={styles.button}>Зарегистрироваться </Link>
    </div>
  </div>
);

export default MainPage;
