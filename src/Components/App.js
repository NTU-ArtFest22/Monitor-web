import React from 'react';

import Monitors from '../Containers/Monitors';
import Videos from '../Containers/Videos';
import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = () => (
    <div>
        <div className="body">
            <Monitors />
            <Videos />
        </div>
        <div className="chatroom">
            <ChatList />
            <SendMsg />
        </div>
    </div>
);

export default App;
