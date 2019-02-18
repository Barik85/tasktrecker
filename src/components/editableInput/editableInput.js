import React, { Component } from 'react';
import { PropTypes } from 'prop-types';


export default class EditableInput extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }

  state = {
    text: this.props.text,
  }

  handleInputChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }
  render() {
    const { text } = this.state;

    return (
      <form>
        <input
          className={this.props.className}
          type="text"
          value={text}
          name="text"
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}
