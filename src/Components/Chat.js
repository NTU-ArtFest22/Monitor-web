import React from 'react';

const Chat = ({ user, monitor, children, switchMonitor, userColor }) => (
    <li className="chat">
        <a className="chat-monitor" href={'#' + monitor} onClick={switchMonitor.bind(null, monitor)}>
            <div className="before"></div><div className="after"></div>
            <span className="text">{monitor}</span>
        </a>
        <span style={{ color: userColor }}>{user.substring(2, 8)}</span>: {children}
    </li>
);

export default Chat;
