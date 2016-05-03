import React from 'react';

const Chat = ({ user, monitor, children, switchMonitor, userColor }) => (
    <li className="chat">
        <a href={'#' + monitor} onClick={switchMonitor.bind(null, monitor)}>({monitor})</a>
        <span style={{ color: userColor }}>{user.substring(2, 8)}</span>: {children}
    </li>
);

export default Chat;
