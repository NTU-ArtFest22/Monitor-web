import React, { Component } from 'react';
import ClassNames from 'classnames';
import dateFormat from 'dateformat';

class Chat extends Component {
    componentDidMount() {
        const { scroll, parent, willScroll } = this.props;
        if (willScroll) {
            scroll(parent);
        }
    }

    render() {
        const { user, monitor, children, switchMonitor, userColor, sendTime, inActive } = this.props;
        return (
            <li className={ClassNames('chat', { inActive: inActive })}>
                <a className="chat-monitor" href={'#' + monitor} onClick={switchMonitor.bind(null, monitor)}>
                    <i className="material-icons">videocam</i>
                    <span className="text">{monitor}</span>
                </a>
                <span className="user" style={{ color: userColor }}>{user.substring(2, 8)}</span>
                <span className="content">: {children}</span>
                <span className="send-time">{dateFormat(new Date(sendTime), 'HH:MM:ss')}</span>
            </li>
        );
    }
}

export default Chat;
