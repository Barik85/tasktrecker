import React, { Component } from 'react';
import CabinetChat from './cabinetChat';
import styles from './chat.module.scss';

export default class Chat extends Component {
  state = {
    openChat: true,
  };

  handlerVisible = () => {
    this.setState(prevState => ({
      openChat: !prevState.openChat,
    }));
  }

  render() {
    const valVisible = this.state.openChat ? styles.iconChat : styles.notVisible;

    return (
      <div className="mainBlock">
        <button
          className={valVisible}
          onClick={this.handlerVisible}
          alt="іконка чата"
        />
        <CabinetChat visible={!this.state.openChat} onclose={this.handlerVisible} />
      </div>
    );
  }
}
