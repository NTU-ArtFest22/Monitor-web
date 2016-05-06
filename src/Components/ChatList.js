import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

import Chat from '../Containers/Chat';

const ChatList = React.createClass({
    componentDidMount() {
        const { fireRef, setMsgToList, addMsgToList, removeMsgFromList, changeMsg, setWillScroll, saveUid } = this.props;
        const dom = findDOMNode(this);

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
            setTimeout(() => {
                removeMsgFromList(snapShot.key());
            }, 0);
        });

        fireRef.on("child_changed", snapShot => {
            setTimeout(() => {
                changeMsg(snapShot.key());
            }, 0);
        });
    },

    render() {
        let { records, willScroll, scrollHandler } = this.props;
        const dom = findDOMNode(this);

        return (
            <ul className="chatlist" onScroll={scrollHandler}>
                {records.map( (record, id) => {
                    let { user, monitor, msg, user_color, send_time, inActive } = record;
                    return (
                        <Chat key={id} parent={dom} user={user} monitor={monitor} userColor={user_color} sendTime={send_time} inActive={inActive}>{msg}</Chat>
                    );
                })}
            </ul>
        );
    }
});

export default ChatList;
