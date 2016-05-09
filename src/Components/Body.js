import React, { Component } from 'react';
import classNames from 'classnames';

import Monitors from '../Containers/Monitors';
import Video from '../Containers/Video';

class Body extends Component {
  componentDidMount () {
    const { monitor, curMonitor, switchMonitor, userRef } = this.props;

  }

  render () {
    const { showChat, toggleShowChat } = this.props;

    return (
      <div className={classNames('body', { 'showChat': showChat })}>
        <Video />
        <div className="before"></div>
        <Monitors />
        <div className="after"></div>
        <a className="toggleShowChat" onClick={toggleShowChat}>
          <i className="material-icons">keyboard_arrow_left</i>
        </a>
      </div>
    );
  }
}

Body.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Body;
