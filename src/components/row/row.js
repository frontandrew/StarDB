import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ left, rigth }) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {rigth}
      </div>
    </div>
  );
}

Row.propTypes = {
  left: PropTypes.node,
  rigth: PropTypes.node,
}

export default Row;
