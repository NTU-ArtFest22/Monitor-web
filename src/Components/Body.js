import React, { Component } from 'react';
import classNames from 'classnames';

import Monitors from '../Containers/Monitors';
import Video from '../Containers/Video';

const Body = ({ showChat, toggleShowChat, control }) => (
  <div className={classNames('body', { 'showChat': showChat }, control)}>
    <Video />
    <div className="before"></div>
    <Monitors />
    <div className="after"></div>
    <a className="toggleShowChat" onClick={toggleShowChat}>
      <i className="material-icons">keyboard_arrow_left</i>
    </a>
  </div>
);

export default Body;
