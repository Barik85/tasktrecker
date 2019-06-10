/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './chat.module.scss';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5050/');

export default class CabinetChat extends Component {
  state = {
    arrMessage: [],
    message: '',
  }

  componentDidMount() {
    console.log('a');
  }
  handlerChange = (e) => {
    const { value } = e.target;
    console.log(value);
    this.setState({ message: value },
      () => { console.log(this.state); });
  }

  addMessage = name => (e) => {
    console.log('preventdefault');
    const newMassege = [name, this.state.message];
    console.log(newMassege);
    this.setState(prevState=>{
      this.state.arrMessage = {
        ...prevState.arrMessage,
        ...newMassege,
      }, ()=> {console.log(prevState.arrMessage)}
    })
    // console.log(this.state.arrMessage);
    //socket.on('newMessage', )
    e.preventDefault();
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

    const { name } = JSON.parse(window.localStorage.taskTrackerState).session.user;
    return (
      <div className={valVisible} >
        <button className={iconClose} onClick={this.closeChat}>x</button>
        {this.state.arrMessage.lenght ?
          <section className="blockMessage">
            <img src="/layout/tasktreker/src/images/user1.png" alt="avatar" />
            <p>{}</p>
            <p>{this.state.arrMessage}</p>
          </section> : ''
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
