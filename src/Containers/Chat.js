import { connect } from 'react-redux';
import chat from '../Components/Chat';
import { getColor } from 'random-material-color';

const mapStateToProps = (state) => ({
    willScroll: state.app.willScroll,
    yourName: state.app.userName,
    yourColor: getColor({ text: state.app.uid })
});

const mapDispatchToProps = (dispatch) => ({
    scroll: (dom) => {
        dom.scrollTop = dom.scrollHeight - dom.clientHeight;
    }
});

const Chat = connect(mapStateToProps, mapDispatchToProps)(chat);

export default Chat;
