import { connect } from 'react-redux';
import chat from '../Components/Chat';

const mapStateToProps = (state) => ({
    willScroll: state.app.willScroll
});

const mapDispatchToProps = (dispatch) => ({
    scroll: (dom) => {
        dom.scrollTop = dom.scrollHeight - dom.clientHeight;
    }
});

const Chat = connect(mapStateToProps, mapDispatchToProps)(chat);

export default Chat;
