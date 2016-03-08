import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Chat from '../Containers/Chat';

class ChatList extends Component {
    componentDidMount() {
        let { socket, addMsgToList, setWillScroll } = this.props;
        const dom = findDOMNode(this);

        socket.on('chat', (data) => {
            let willScroll = dom.scrollTop + dom.clientHeight >= dom.scrollHeight;
            setWillScroll(willScroll);
            addMsgToList(data);
            if (willScroll)
                dom.scrollTop = dom.scrollHeight - dom.clientHeight;
        });
    }

    render() {
        let { records, willScroll, scrollHandler } = this.props;

        return (
            <ul className="chatlist" onScroll={scrollHandler}>
                {records.map( (record, i) => {
                    let { user, monitor, msg } = record;
                    return (
                        <Chat key={i} user={user} monitor={monitor}>{msg}</Chat>
                    );
                })}
            </ul>
        );
    }
}

export default ChatList;
