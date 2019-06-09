import React, { Component, Fragment } from 'react';
import CabinetChat from './cabinetChat';
// import PropTypes from 'prop-types';
import styles from './chat.module.scss';

export default class Chat extends Component {
  state = {
    openChat: false,
  };

  handlerVisible = () => {
    this.setState(prevState,{
      openChat: prevState.openChat ? false : true,
    })
  }

  render() {
    const valVisible = this.state.openChat?
      styles.iconChat : styles.visible;
    return (
      <Fragment>rrr
        <div
          className={valVisible}
          onClick={this.handlerVisible}
        />
        <CabinetChat  visible={this.state.openChat? false : true}/>
      </Fragment>
    );
  }
}
