import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    inputName: PropTypes.string,
    label: PropTypes.string,
  }

  static defaultProps = {
    value: '',
    placeholder: '',
    onChange: () => {},
    inputName: '',
    label: '',
  }

  state = {
    text: this.props.value,
  }

  handleInputChange = (e) => {
    const value = e.target.value;

    this.setState({
      text: value,
    });

    if (this.props.onChange) this.props.onChange(value);
  }

  render() {
    const { inputName, placeholder, label } = this.props;
    const { text } = this.state;

    return (
      <Fragment>
        {label !== '' &&
          <label htmlFor={inputName}>
            {label}
          </label>
        }
        <input name={inputName} onChange={this.handleInputChange} type="text" placeholder={placeholder} value={text} />
      </Fragment>
    );
  }
}
