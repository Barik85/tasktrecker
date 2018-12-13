import React from 'react';
import { connect } from 'react-redux';
import styles from './home.module.scss';
import Button from '../../components/shared/Button';
import MainPage from '../mainPage/MainPage';
import ModalManager from '../modalManager/ModalManager';
import { openModal } from '../modalManager/modalActions';


const CardsList = [];

const cardListEmpty = (CardsList.length > 0);
const PublicActions = () => (<MainPage/>);

const PrivateActions = () => (
  <div>
    {cardListEmpty ? 
    "Здесь будет список карточек CardsList" : <p className={styles.text}>Пока что ничего не создано</p>}
    <Button text="Добавить задачу" onClick={()=>openModal}/>
  </div>
)
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

const mDTP = () => ({
  openModal
});

export default connect(mDTP)(Home);
