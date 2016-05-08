import { connect } from 'react-redux';
import monitor from '../Components/Monitor';
import { switchMonitor } from '../Actions/Monitors';

const mapStateToProps = (state, ownProps) => ({
    active: state.app.monitor === ownProps.monitor,
    counter: state.app.onlineCounter.get(ownProps.monitor) || 0,
    src: state.app.players[ownProps.monitor - 1].src
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchMonitor: () => {
        dispatch(switchMonitor(ownProps.userRef, ownProps.monitor));
    }
});

const Monitor = connect(mapStateToProps, mapDispatchToProps)(monitor);

export default Monitor;
