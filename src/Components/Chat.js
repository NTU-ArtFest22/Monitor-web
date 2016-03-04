import React from 'react';

const Chat = ({ user, monitor, children }) => (
    <li>{user}({monitor}): {children}</li>
);

export default Chat;
