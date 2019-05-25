import React from 'react';
import PropTypes from 'prop-types';

const Bell = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 510 510" style={{ enableBackground: 'new 0 0 510 510' }} xmlSpace="preserve">
    <g>
      <g>
        <path d="M255,510c28.05,0,51-22.95,51-51H204C204,487.05,226.95,510,255,510z M420.75,357V216.75    c0-79.05-53.55-142.8-127.5-160.65V38.25C293.25,17.85,275.4,0,255,0c-20.4,0-38.25,17.85-38.25,38.25V56.1    c-73.95,17.85-127.5,81.6-127.5,160.65V357l-51,51v25.5h433.5V408L420.75,357z M369.75,382.5h-229.5V216.75    C140.25,153,191.25,102,255,102s114.75,51,114.75,114.75V382.5z" />
      </g>
    </g>
  </svg>
);

Bell.propTypes = {
  className: PropTypes.string,
};

Bell.defaultProps = {
  className: '',
};

export default Bell;