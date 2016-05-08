import { connect } from 'react-redux';
import { Body as body } from '../Components/App';
import { toggleShowChat } from '../Actions/ChatList';

const mapStateToProps = (state) => ({
  showChat: state.app.showChat
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowChat: () => {
    dispatch(toggleShowChat());
  }
});

const Body = connect(mapStateToProps, mapDispatchToProps)(body);

export default Body;
