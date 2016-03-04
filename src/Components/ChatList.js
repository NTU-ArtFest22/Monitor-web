import React, { Component } from 'react';

import Chat from './Chat';

class ChatList extends Component {
    componentDidMount() {
        let { socket, addMsgToList } = this.props;

        socket.on('chat', (data) => {
            addMsgToList(data);
        });
    }

    render() {
        let { records } = this.props;

        return (
            <ul className="chatlist">
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
