import React from 'react';
import classNames from 'classnames';

import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = ({ showChat, children }) => (
    <div className="root-container">
        {children}
        <div className={classNames('chatroom', { 'showChat': showChat })}>
            <ChatList />
            <SendMsg />
        </div>
    </div>
);

export default App;
