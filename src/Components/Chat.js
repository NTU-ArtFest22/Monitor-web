import React from 'react';

const Chat = ({ user, monitor, children }) => (
    <li class="chat">{user}({monitor}): {children}</li>
);

export default Chat;
