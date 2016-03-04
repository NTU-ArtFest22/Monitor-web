import React from 'react';

const Chat = ({ user, monitor, children }) => (
    <li className="chat">({monitor}){user.substring(2, 8)}: {children}</li>
);

export default Chat;
