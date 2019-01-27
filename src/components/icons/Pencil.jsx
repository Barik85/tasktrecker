import React from 'react';
import classNames from 'class-names';
import PropTypes from 'prop-types';

const Pencil = ({ className }) => (
  <svg
    className={classNames(className)}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 390.26 390.26"
  >
    <g>
      <g>
        <path d="M387.335,77.03l-74.2-74.1c-3.9-3.9-10.2-3.9-14.1,0l-62.9,62.8l-195,194.6c-1.4,1.2-2.4,2.7-3,4.4l-37.6,112.3
          c-1.8,5.2,1.1,10.9,6.3,12.7c2.1,0.7,4.3,0.7,6.3,0l112.4-37.6c1.7-0.6,3.2-1.6,4.4-3l194.6-195l62.8-63
          C391.235,87.23,391.235,80.93,387.335,77.03z M25.835,364.43l26.1-78l51.9,51.9L25.835,364.43z M122.335,328.43l-60.5-60.5
          l181.3-181l60.2,60.2L122.335,328.43z M317.435,133.03l-60.1-60.2l48.8-48.7l60,60L317.435,133.03z"
        />
      </g>
    </g>
  </svg>
);

Pencil.propTypes = {
  className: PropTypes.string,
};

Pencil.defaultProps = {
  className: '',
};

export default Pencil;
