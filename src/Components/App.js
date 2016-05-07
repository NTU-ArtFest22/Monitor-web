import React from 'react';
import classNames from 'classnames';

import Monitors from '../Containers/Monitors';
import Video from '../Containers/Video';
import SendMsg from '../Containers/SendMsg';
import ChatList from '../Containers/ChatList';

export const Body = ({ showChat, toggleShowChat }) => (
    <div className={classNames('body', { 'showChat': showChat })}>
        <Video />
        <div className="before"></div>
        <Monitors />
        <div className="after"></div>
        <a className="toggleShowChat" onClick={toggleShowChat}>
            <i className="material-icons">keyboard_arrow_left</i>
        </a>
    </div>
);

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
