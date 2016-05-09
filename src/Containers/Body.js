import { connect } from 'react-redux';
import body from '../Components/Body';
import { toggleShowChat } from '../Actions/ChatList';
import { switchMonitor } from '../Actions/Monitors';

const mapStateToProps = (state, ownProps) => ({
  showChat: state.app.showChat,
  monitor: state.app.monitor,
  curMonitor: ownProps.params.id,
  userRef: state.app.userRef
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowChat: () => {
    dispatch(toggleShowChat());
  },
  switchMonitor: monitor => {
    dispatch(switchMonitor(monitor));
  }
});

const Body = connect(mapStateToProps, mapDispatchToProps)(body);

export default Body;
