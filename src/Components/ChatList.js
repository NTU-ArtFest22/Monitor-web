import React from 'react';
import { findDOMNode } from 'react-dom';

import Chat from '../Containers/Chat';

const ChatList = React.createClass({
    componentDidMount() {
        const { fireRef, setMsgToList, addMsgToList, removeMsgFromList, changeMsg, setWillScroll, saveUid } = this.props;
        const dom = findDOMNode(this);
        this.setState({ dom });

        fireRef.limitToLast(15).once("value", (snapShot, prevChildKey) => {
            setMsgToList(snapShot.val());
            dom.scrollTop = dom.scrollHeight - dom.clientHeight;
        });

        fireRef.orderByChild('send_time').startAt(Date.now()).on("child_added", snapShot => {
            const willScroll = dom.scrollTop + dom.clientHeight >= dom.scrollHeight;
            setWillScroll(willScroll);
            addMsgToList(snapShot.key(), snapShot.val(), dom, willScroll);
        });

        fireRef.on("child_removed", snapShot => {
            removeMsgFromList(snapShot.key());
        });

        fireRef.on("child_changed", snapShot => {
            changeMsg(snapShot.key(), snapShot.val());
        });
    },

    render() {
        let { records, willScroll, scrollHandler } = this.props;

        return (
            <ul className="chatlist" onScroll={scrollHandler}>
                {records.map( (record, id) => {
                    let { user, monitor, msg, user_color, send_time, inActive } = record;
                    return (
                        <Chat key={id} parent={this.state.dom} user={user} monitor={monitor} userColor={user_color} sendTime={send_time} inActive={inActive}>{msg}</Chat>
                    );
                }).toArray()}
            </ul>
        );
    }
});

export default ChatList;
