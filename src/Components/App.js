import React from 'react';

import Monitors from '../Containers/Monitors';
import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = () => (
    <div>
        <Monitors />
        <div className="chatroom">
            <ChatList />
            <SendMsg />
        </div>
    </div>
);

export default App;
