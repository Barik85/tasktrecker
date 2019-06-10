import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './chat.module.scss';

export default class CabinetChat extends Component {
  componentDidMount() {
    console.log('a');
  }

  render() {
    const valVisible = this.props.visible ?
      styles.blockChat : styles.notVisible;
    return (
      <div className={valVisible} >
        <section className="blockMessage">
          <img src="" alt="" />
          <p>1</p>
        </section>
        <section className="blockIntroduce">
          <input type="text" />
          <button>send</button>
        </section>
      </div>
    );
  }
}

CabinetChat.propTypes = {
  visible: PropTypes.bool.isRequired,
};
