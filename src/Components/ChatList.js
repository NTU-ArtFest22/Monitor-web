import React, { Component } from 'react';

import Chat from './Chat';

class ChatList extends Component {
    componentDidMount() {
        let { socket, addMsgToList } = this.props;

        socket.on('chat', function(data) {
            addMsgToList(data);
        });
    }

    render() {
        let { records } = this.props;

        return (
            <ul>
                {records.map( (record) => (
                    <Chat>{record}</Chat>
                ))}
            </ul>
        );
    }
}

export default ChatList;
