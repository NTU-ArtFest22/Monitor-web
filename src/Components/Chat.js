import React from 'react';

const Chat = ({ user, monitor, children, switchMonitor }) => (
    <li className="chat">
        <a onClick={switchMonitor.bind(null, monitor)}>({monitor})</a>
        {user.substring(2, 8)}: {children}
    </li>
);

export default Chat;
