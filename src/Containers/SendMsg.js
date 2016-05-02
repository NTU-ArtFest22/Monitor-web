import React from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../Actions/ChatList';

let input = null;

const mapStateToProps = (state) => ({
    willScroll: state.willScroll
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (event) => {
        event.preventDefault();
        if (!input.value.trim()) return;

        dispatch(sendMsg(input.value));

        input.value = "";
    }
});

let SendMsg = ({ onSubmit, willScroll }) => (
    <form className="send-msg-form" onSubmit={onSubmit}>
        <textarea className="send-msg-input" placeholder="傳送訊息" type="text" ref={node => { input = node; }} />
        <button className="send-msg-submit" type="submit">送出訊息</button>
        {willScroll ? '' : (<div className="new-msg-hint">new</div>)}
    </form>
);

SendMsg = connect(mapStateToProps, mapDispatchToProps)(SendMsg);

export default SendMsg;
