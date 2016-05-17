import React from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../Actions/ChatList';

let input = null;

const mapStateToProps = (state) => ({
    willScroll: state.app.willScroll,
    uid: state.app.uid,
    userName: state.app.userName,
    monitor: state.app.monitor
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (event, uid, monitor, userName) => {
        event.preventDefault();
        if (!input.value.trim() || !userName) return;

        sendMsg({
            msg: input.value.substring(0, 100),
            user: uid,
            user_name: userName,
            monitor
        });

        input.value = "";
    },

    onKeyDown: (event, uid, monitor, userName) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!input.value.trim() || !userName) return;

            sendMsg({
                msg: input.value.substring(0, 100),
                user: uid,
                user_name: userName,
                monitor
            });

            input.value = "";
        }
    }
});

let SendMsg = ({ uid, userName, monitor, onSubmit, willScroll, onKeyDown }) => (
    <form className="send-msg-form" onSubmit={(e) => onSubmit(e, uid, monitor, userName)}>
        <textarea className="send-msg-input" placeholder="傳送訊息" type="text" ref={node => { input = node; }} onKeyDown={(e) => onKeyDown(e, uid, monitor, userName)} />
        <button className="send-msg-submit" type="submit"><i className="material-icons">send</i></button>
        {willScroll ? '' : (<div className="new-msg-hint">new</div>)}
    </form>
);

SendMsg = connect(mapStateToProps, mapDispatchToProps)(SendMsg);

export default SendMsg;
