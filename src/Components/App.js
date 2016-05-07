import React from 'react';
import classNames from 'classnames';

import Monitors from '../Containers/Monitors';
import Video from '../Containers/Video';
import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

export const Body = ({ showChat }) => (
    <div className={classNames('body', { 'showChat': showChat })}>
        <Video />
        <div className="before"></div>
        <Monitors />
        <div className="after"></div>
    </div>
);

const App = ({ showChat, toggleShowChat, children }) => (
    <div>
        {children}
        <div className={classNames('chatroom', { 'showChat': showChat })}>
            <a className="toggleShowChat" onClick={toggleShowChat}>
                <i className="material-icons">keyboard_arrow_left</i>
            </a>
            <ChatList />
            <SendMsg />
        </div>
    </div>
);

export default App;
