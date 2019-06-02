import React, { Component, Fragment } from 'react';
import CabinetChat from './cabinetChat';
// import PropTypes from 'prop-types';
import styles from './chat.module.scss';

export default class Chat extends Component {
  state = {
    openChat: false,
  };

  render() {
    return (
      <Fragment>
        <div className={styles.iconChat} >1</div>
        <CabinetChat />
      </Fragment>
    );
  }
}
