import React from 'react';

import './BuildControl.scss';

const BuildControl = ({ label }) => (
  <div className="build-control">
    <div className="build-contol-label">{label}</div>
    <button className="less">Less</button>
    <button className="more">More</button>
  </div>
);

export default BuildControl;
