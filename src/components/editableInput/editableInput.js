import React from 'react';
import { PropTypes } from 'prop-types';

const EditableInput = ({ className, value, name, handleInputChange }) => (
  <form>
    <input
      className={className}
      type="text"
      value={value}
      name={name}
      onChange={handleInputChange}

    />
  </form>
);

EditableInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default EditableInput;
