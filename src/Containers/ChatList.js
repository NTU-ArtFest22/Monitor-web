import ChatList from '../Components/ChatList';
import { addMsgToList } from '../Actions/ChatList';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    socket: state.socket,
    records: state.records
});

const mapDispatchToProps = (dispatch) => ({
    addMsgToList: (data) => {
        dispatch(addMsgToList(data));
    }
});

const chatlist = connect(mapStateToProps, mapDispatchToProps)(ChatList);

export default chatlist;
