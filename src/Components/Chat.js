import React, { Component } from 'react';
import ClassNames from 'classnames';
import dateFormat from 'dateformat';
import { Link } from 'react-router';

class Chat extends Component {
    componentDidMount () {
        const { scroll, parent, willScroll } = this.props;
        if (willScroll) {
            scroll(parent);
        }
    }

    render () {
        const { yourName, yourColor, user, userName, monitor, children, userColor, sendTime, inActive } = this.props;

        if (user === 'system') {
          return (
            <li className="chat">
              <span className="content" style={{ color: userColor }}>
                {children}
                <span style={{ color: yourColor }}>{yourName}</span>
              </span>
              <span className="send-time">{dateFormat(new Date(sendTime), 'HH:MM:ss')}</span>
            </li>
          );
        }

        return (
          <li className={ClassNames('chat', { inActive: inActive })}>
            <Link className="chat-monitor" to={{ pathname: '/', query: { monitor } }}>
              <i className="material-icons">videocam</i>
              <span className="text">{monitor}</span>
            </Link>
            <span className="user" style={{ color: userColor }}>{userName || user.substring(2, 8)}</span>
            <span className="content">: {children}</span>
            <span className="send-time">{dateFormat(new Date(sendTime), 'HH:MM:ss')}</span>
          </li>
        );
    }
}

export default Chat;
