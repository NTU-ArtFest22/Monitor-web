import React from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../Actions/ChatList';

let input = null;

const mapStateToProps = (state) => ({
    willScroll: state.willScroll,
    uid: state.uid,
    monitor: state.monitor
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (event, uid, monitor) => {
        event.preventDefault();
        if (!input.value.trim()) return;
        console.log('click', Date.now());
        sendMsg({
            msg: input.value,
            user: uid,
            monitor
        });

        input.value = "";
    },

    onKeyDown: (event, uid, monitor) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!input.value.trim()) return;

            sendMsg({
                msg: input.value,
                user: uid,
                monitor
            });

            input.value = "";
        }
    }
});

let SendMsg = ({ uid, monitor, onSubmit, willScroll, onKeyDown }) => (
    <form className="send-msg-form" onSubmit={(e) => onSubmit(e, uid, monitor)}>
        <textarea className="send-msg-input" placeholder="傳送訊息" type="text" ref={node => { input = node; }} onKeyDown={(e) => onKeyDown(e, uid, monitor)} />
        <button className="send-msg-submit" type="submit">送出訊息</button>
        {willScroll ? '' : (<div className="new-msg-hint">new</div>)}
    </form>
);

SendMsg = connect(mapStateToProps, mapDispatchToProps)(SendMsg);

export default SendMsg;
