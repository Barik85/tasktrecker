import React from 'react';
import PropTypes from 'prop-types';
import styles from './home.module.scss';
import Button from '../../components/shared/Button';
import MainPage from '../mainPage/MainPage';
import ModalManager from '../modalManager/ModalManager';

const CardsList = [];

const cardListEmpty = (CardsList.length > 0);
const PublicActions = () => (<MainPage/>);

const PrivateActions = ({ openModal }) => (
  <div>
    {cardListEmpty ?
    "Здесь будет список карточек CardsList" : <p className={styles.text}>Пока что ничего не создано</p>}
    <Button text="Добавить задачу" onClick={() => {openModal('NEW_TASK_MODAL')}}/>
  </div>
);

PrivateActions.propTypes = {
  openModal: PropTypes.func.isRequired,
};

const Home = ({authenticated, ...props}) => (

    <main className={styles.wrapper}>
      { authenticated ?
        (
          <PrivateActions {...props}/>
        ) : (
          <PublicActions />
        )
      }
      <ModalManager />
    </main>
);

export default Home;
