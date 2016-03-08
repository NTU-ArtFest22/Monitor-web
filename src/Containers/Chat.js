import { connect } from 'react-redux';
import chat from '../Components/Chat';

import { switchMonitor } from '../Actions/Monitors';

const mapDispatchToProps = (dispatch) => ({
    switchMonitor: (monitor) => {
        dispatch(switchMonitor(monitor));
    }
});

const Chat = connect(null, mapDispatchToProps)(chat);

export default Chat;
