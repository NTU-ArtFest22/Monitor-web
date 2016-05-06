import { connect } from 'react-redux';
import chat from '../Components/Chat';

import { scroll } from '../Actions/ChatList';
import { switchMonitor } from '../Actions/Monitors';

const mapStateToProps = (state) => ({
    willScroll: state.willScroll
});

const mapDispatchToProps = (dispatch) => ({
    switchMonitor: (monitor) => {
        dispatch(switchMonitor(monitor));
    },
    scroll: (dom) => {
        dom.scrollTop = dom.scrollHeight - dom.clientHeight;
    }
});

const Chat = connect(mapStateToProps, mapDispatchToProps)(chat);

export default Chat;
