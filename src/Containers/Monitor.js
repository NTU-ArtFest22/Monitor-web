import { connect } from 'react-redux';
import monitor from '../Components/Monitor';
import { switchMonitor } from '../Actions/Monitors';

const mapStateToProps = (state, ownProps) => ({
    active: state.monitor === ownProps.monitor,
    counter: state.onlineCounter[ownProps.monitor - 1] || 0,
    src: state.players[ownProps.monitor - 1].src
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchMonitor: () => {
        dispatch(switchMonitor(ownProps.curMonitor, ownProps.monitor));
    }
});

const Monitor = connect(mapStateToProps, mapDispatchToProps)(monitor);

export default Monitor;
