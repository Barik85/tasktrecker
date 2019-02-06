/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';
import styles from './home.module.scss';
import MainPage from '../mainPage/MainPage';
import ModalManager from '../modalManager/ModalManager';
import NotesList from '../notes_list/Note_list';

const CardsList = [
  {
    userId: '',
    id: 1,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 2,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 3,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 4,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 5,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 6,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 7,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 8,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    userId: '',
    id: 9,
    title: 'Go on shopping and then go back. Lorem ipsum',
    description: 'I want to by some food.',
    color: '#000',
    deadline: '2019/01/31',
    reminder: '',
    timestamps: {
      createdAt: '',
      updatedAt: '',
    },
  },
];

const cardListEmpty = (CardsList.length === 0);
const PublicActions = () => (<MainPage />);

const PrivateActions = ({ openModal }) => (
  cardListEmpty ? (
    <div>
      <p className={styles.text}>Пока что ничего не создано</p>
    </div>
  ) : <NotesList openModal={openModal} notes={CardsList} />
);

PrivateActions.propTypes = {
  openModal: PropTypes.func.isRequired,
};

class Home extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    signInWithGoogle: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
  }

  static getDerivedStateFromProps() {
    // зміна пропів при необхідності
    console.log('getDerived');
  }

  componentDidMount() {
    const userToken = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    console.log(CardsList);
    if (userToken.token) {
      this.props.signInWithGoogle(userToken.token);
      this.props.history.push('/');
    }
    const { token } = this.props;
    const headers = { "Authorization": 'Bearer ' + token};
    console.log(headers);
    axios.get('https://taskboard.luisi.top/tasks/', headers)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err + " " + "<< Ypps...check how to use correct token in your GET request! >>");
      });

    // const CardsListTest = () => {
    //   console.log("axios");
    //   const AuthStr = window.localStorage.getItem('token');
    //   const fullAuth = `{'Authorization': "Bearer" +  ${AuthStr}`;
    //   const headers = { headers: { fullAuth } };    
    // };
  }

  render() {
    const { authenticated } = this.props;
    return (
      <main className={styles.wrapper}>
        {authenticated ?
          (
            <PrivateActions {...this.props} />
          ) : (
            <PublicActions />
          )
        }
        <ModalManager />
      </main>
    );
  }
}

export default Home;
