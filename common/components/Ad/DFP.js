import React, { PropTypes } from 'react';
import Dfp from 'react-simple-dfp';
const canUseDOM = !!(typeof window !== 'undefined' && window.document);

// opts format: ['/5799246/Nownews_home_300x250_M1_new2', [300, 250], 'div-gpt-ad-1496983171426-0']
const DFP = ({ className = '', opts }) => {
  if (canUseDOM && window.location.search.indexOf('ad=0') > -1) {
    return null;
  }
  return (
    <div className={className} key={opts[0]}>
      <Dfp adUnitPath={opts[0]}
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
