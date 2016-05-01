import React from 'react';
import classNames from 'classnames';

import Monitors from '../Containers/Monitors';
import Video from '../Containers/Video';
import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

const App = ({ showChat, toggleShowChat }) => (
    <div>
        <div className={classNames('body', { 'showChat': showChat })}>
            <Video />
            <Monitors />
        </div>
        <div className={classNames('chatroom', { 'showChat': showChat })}>
            <a className="toggleShowChat" onClick={toggleShowChat}>
                <div className="after"></div>
            </a>
            <ChatList />
            <SendMsg />
        </div>
    </div>
);

export default App;
