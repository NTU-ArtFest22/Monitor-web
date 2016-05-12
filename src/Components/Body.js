import React, { Component } from 'react';
import classNames from 'classnames';

import Monitors from '../Containers/Monitors';
import Video from '../Containers/Video';

const mapControlToIconName = control => {
  switch (control) {
    case 'down':
      return 'arrow_downward';
    case 'up':
      return 'arrow_upward';
    case 'right':
      return 'arrow_forward';
    case 'left':
      return 'arrow_backward';
    case 'interact':
      return 'touch_app';
    default:
      return '';
  }
};

const Body = ({ showChat, toggleShowChat, control, controlStop, loading }) => (
  <div className={classNames('body', { 'showChat': showChat }, control)}>
    <Video />
    <div className="before"></div>
    <Monitors />
    <div className="after"></div>
    <a className="toggleShowChat" onClick={toggleShowChat}>
      <i className="material-icons">keyboard_arrow_left</i>
    </a>

    {control !== "stop" ? (
      <span className={classNames('control-popup', control, { 'stop': controlStop })}>
        <i className="material-icons">{mapControlToIconName(control)}</i>
      </span>
    ): ''}
  </div>
);

export default Body;
