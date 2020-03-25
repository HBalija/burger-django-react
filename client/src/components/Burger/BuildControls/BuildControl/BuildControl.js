import React from 'react';

import './BuildControl.scss';

const BuildControl = ({ label, added, removed, disabled }) => (
  <div className="build-control">
    <div className="build-contol-label">{label}</div>
    <button className="less" onClick={removed} disabled={disabled}>Less</button>
    <button className="more" onClick={added}>More</button>
  </div>
);

export default BuildControl;
