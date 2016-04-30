import { connect } from 'react-redux';
import app from '../Components/App';
import { toggleShowChat } from '../Actions/ChatList';

const mapStateToProps = (state) => ({
    showChat: state.showChat
});

const mapDispatchToProps = (dispatch) => ({
    toggleShowChat: () => {
        dispatch(toggleShowChat());
    }
});

const App = connect(mapStateToProps, mapDispatchToProps)(app);

export default App;
