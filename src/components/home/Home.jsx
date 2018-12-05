import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import styles from './home.module.scss';
import Button from '../../components/shared/Button';
import MainPage from '../mainPage/MainPage';
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
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
      updatedAt: ''
    }
  },
];

const cardListEmpty = (CardsList.length === 0);
const PublicActions = () => (<MainPage/>);

const PrivateActions = () => (
  cardListEmpty ? (
    <div>
      <p className={styles.text}>Пока что ничего не создано</p>
      <Button text="Добавить задачу"/>
    </div>
    ) : <NotesList notes={CardsList} />
)

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

  componentDidMount() {
    const userToken = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

    if (userToken.token) {
        this.props.signInWithGoogle(userToken.token);
        this.props.history.push("/");
    }

  }

  render() {
    const { authenticated } = this.props;

    return (
      <main className={styles.wrapper}>
        { authenticated ?
          (
            <PrivateActions {...this.props}/>
          ) : (
            <PublicActions />
          )
        }
      </main>
    );
  }
}

export default Home;
