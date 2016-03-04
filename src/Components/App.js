import React from 'react';

import Monitors from '../Containers/Monitors';
import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = () => (
    <div>
        <Monitors />
        <SendMsg />
        <ChatList />
    </div>
);

export default App;
