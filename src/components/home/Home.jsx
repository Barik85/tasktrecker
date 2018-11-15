import React from 'react';
import styles from './home.module.scss';
import Button from '../../components/shared/Button';
import MainPage from '../mainPage/MainPage';


const CardsList = [];

const cardListEmpty = (CardsList.length > 0);
const PublicActions = () => (<MainPage/>);

const PrivateActions = () => (
  <div className={styles.home}>
    {cardListEmpty ? 
    "Здесь будет список карточек CardsList" : "Пока что ничего не создано"}
    <Button text="Добавить задачу"/>
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
    </main>  
);

export default Home;
