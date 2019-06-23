/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './chat.module.scss';
import openSocket from 'socket.io-client';
import { v4 } from 'uuid';


// const socket = openSocket('http://localhost:5050/');

export default class CabinetChat extends Component {
  state = {
    arrMessage: [],
    message: '',
  }

  componentDidMount() {
    // console.log('a');
  }
  handlerChange = (e) => {
    const { value } = e.target;
    this.setState({ message: value },
      ()=> {console.log(this.state.message)}
    );
    // e.preventDefault();
  }

  addMessage = name => e =>  {
    (name.length > 0) ?
    this.setState( state =>
      {arrMessage: state.arrMessage.push({id:v4() ,name:name ,message:state.message})},
      ()=> {console.log(this.state.arrMessage)}

    )
      : e.preventDefault();
    // console.log(this.state.arrMessage);
    //socket.on('newMessage', )

    // socket.on('news', data=>console.log('From socket: ', data));
    // setInterval(()=>{
    //   socket.emit("post", { reactSend:'tttttttt' });
    // }, 1000000 );
  }

  closeChat = () => {
    this.props.onclose();
  }

  render() {
    const valVisible = this.props.visible ?
      styles.blockChat : styles.notVisible;
    const iconClose = this.props.visible ? styles.iconClose
      : styles.notVisible;

    console.log(this.state.arrMessage);

    const {arrMessage} = this.state;

    const { name } = JSON.parse(window.localStorage.taskTrackerState).session.user;
    return (
      <div className={valVisible} >
        <button className={iconClose} onClick={this.closeChat}>x</button>
          {arrMessage.length > 0 &&
          <ul className={styles.blockMessage}>
            {arrMessage.map(elem => {
              <li key={elem.id}>
                <img src="/layout/tasktreker/src/images/user1.png" alt="avatar"/>
                <p>{elem.name}</p>
                <p>{elem.message}</p>
              </li>
              })
            }
          </ul>
          }

        <section className={styles.blockIntroduce}>
          <input type="text" value={this.state.message} onChange={this.handlerChange} />
          <button onClick={this.addMessage(name)}>send</button>
        </section>
      </div>
    );
  }
}

CabinetChat.propTypes = {
  visible: PropTypes.bool.isRequired,
  onclose: PropTypes.func.isRequired,
};