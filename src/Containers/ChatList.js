import ChatList from '../Components/ChatList';
import { addMsgToList, setWillScroll } from '../Actions/ChatList';
import { findDOMNode } from 'react-dom';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    socket: state.socket,
    records: state.records,
    willScroll: state.willScroll
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addMsgToList: (data) => {
        dispatch(addMsgToList(data));
    },
    setWillScroll: (willScroll) => {
        dispatch(setWillScroll(willScroll));
    },
    scrollHandler: (event) => {
        const dom = event.target;
        dispatch(setWillScroll(dom.scrollTop + dom.clientHeight >= dom.scrollHeight));
    }
});

const chatlist = connect(mapStateToProps, mapDispatchToProps)(ChatList);

export default chatlist;
