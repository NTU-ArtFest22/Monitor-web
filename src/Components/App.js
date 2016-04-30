import React from 'react';

import Monitors from '../Containers/Monitors';
import Video from '../Containers/Video';
import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = () => (
    <div>
        <div className="body">
            <Video />
            <Monitors />
        </div>
        <div className="chatroom">
            <ChatList />
            <SendMsg />
        </div>
    </div>
);

export default App;
