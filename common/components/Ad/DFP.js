import React, { PropTypes } from 'react';
import Dfp from 'react-simple-dfp';

const DFP = ({ className = '', opts }) => (
  <div className={className} >
    <Dfp adUnitPath={opts[0]}
      adCollapse
      adSize={opts[1]}
      adElementId={opts[2]} />
  </div>
);

DFP.propTypes = {
  className: PropTypes.string,
  opts: PropTypes.array.isRequired
};

export default DFP;
