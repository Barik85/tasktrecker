/*eslint-disable*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './chat.module.scss';
// import openSocket from 'socket.io-client';
import { v4 } from 'uuid';
import icon1 from "../../images/user1.png";


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
    this.setState({ message: value });
    e.preventDefault();
  }

  addMessage = name => e =>  {
    e.preventDefault();

    this.setState( prevState =>({
    arrMessage: prevState.arrMessage.concat({id:v4(), name:name ,message:prevState.message})
    }) ,
    ()=> {
      console.log(this.state.message);
    }
    )
    this.setState(prewState => ({message: ''})
    )
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
        {this.state.arrMessage.length > 0 &&
          <div>
            <ul>
              {arrMessage.map( (i) => (
                <li key={i.id} className={styles.sendUser}>
                  <div className={styles.userData}>
                    <img src={icon1} alt="avatar"/>
                    <p>{i.name}</p>
                  </div>
                  <div className={styles.userMessage}>{i.message}</div>
                </li>
                )
              ) }
            </ul>
          </div>

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
