import ChatList from '../Components/ChatList';
import { saveUid, setMsgToList, addMsgToList, removeMsgFromList, setWillScroll, connectedToChat } from '../Actions/ChatList';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    fireRef: state.app.fireRef,
    records: state.app.records,
    willScroll: state.app.willScroll
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
    },
    connectedToChat: () => {
      dispatch(connectedToChat());
    }
});

const chatlist = connect(mapStateToProps, mapDispatchToProps)(ChatList);

export default chatlist;
