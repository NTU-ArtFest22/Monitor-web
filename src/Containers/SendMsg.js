import React from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../Actions/ChatList';

let input = null;

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (event) => {
        event.preventDefault();
        if (!input.value.trim()) return;

        dispatch(sendMsg(input.value));

        input.value = "";
    }
});

let SendMsg = ({ onSubmit }) => (
    <form className="send-msg-form" onSubmit={onSubmit}>
        <input className="send-msg-input" placeholder="傳送訊息" type="text" ref={node => { input = node; }} />
        <input className="send-msg-submit" type="submit" value="Send" />
    </form>
);

SendMsg = connect(null, mapDispatchToProps)(SendMsg);

export default SendMsg;
