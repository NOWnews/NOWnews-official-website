import React, { PropTypes } from 'react';
import Dfp from 'react-simple-dfp';

// opts format: ['/5799246/Nownews_home_300x250_M1_new2', [300, 250], 'div-gpt-ad-1496983171426-0']
const DFP = ({ className = '', opts }) => {
  return (
    <div className={className} >
      <Dfp adUnitPath={opts[0]} key={opts[0]}
        adCollapse
        adSize={opts[1]}
        adElementId={opts[2]} />
    </div>
  );
};

DFP.propTypes = {
  className: PropTypes.string,
  opts: PropTypes.array.isRequired
};

export default DFP;
