import { connect } from 'react-redux';
import app from '../Components/App';
import { toggleShowChat } from '../Actions/ChatList';
import { createAction } from 'redux-actions';
import Cookies from 'cookies-js';

const closeLegalHint = createAction('CLOSE_LEGAL_HINT');

const mapStateToProps = (state) => ({
    showChat: state.app.showChat,
    showLegalHint: state.app.showLegalHint
});

const mapDispatchToProps = (dispatch) => ({
    toggleShowChat: () => {
        dispatch(toggleShowChat());
    },
    closeLegalHint: () => {
      Cookies.set('readLegalHint', 'true');
      dispatch(closeLegalHint());
    }
});

const App = connect(mapStateToProps, mapDispatchToProps)(app);

export default App;
