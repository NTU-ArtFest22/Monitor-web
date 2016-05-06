import ChatList from '../Components/ChatList';
import { saveUid, setMsgToList, addMsgToList, removeMsgFromList, changeMsg, setWillScroll } from '../Actions/ChatList';
import { findDOMNode } from 'react-dom';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    fireRef: state.fireRef,
    socket: state.socket,
    records: state.records,
    willScroll: state.willScroll
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setMsgToList: (msg) => {
        dispatch(setMsgToList(msg));
    },
    addMsgToList: (key, value, dom, willScroll) => {
        dispatch(addMsgToList(key, value));
        if (willScroll) {
            dom.scrollTop = dom.scrollHeight - dom.clientHeight;
        }
    },
    removeMsgFromList: (key) => {
        dispatch(removeMsgFromList(key));
    },
    changeMsg: (key, value) => {
        dispatch(addMsgToList(key, value));
    },
    setWillScroll: (willScroll) => {
        dispatch(setWillScroll(willScroll));
    },
    scrollHandler: (event) => {
        const dom = event.target;
        dispatch(setWillScroll(dom.scrollTop + dom.clientHeight >= dom.scrollHeight));
    },
    saveUid: (uid) => {
        dispatch(saveUid(uid));
    }
});

const chatlist = connect(mapStateToProps, mapDispatchToProps)(ChatList);

export default chatlist;
