import { connect } from 'react-redux';
import monitor from '../Components/Monitor';

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.curMonitor.toString() === ownProps.monitor.toString(),
    counter: state.app.onlineCounter.get(ownProps.monitor) || 0,
    src: state.app.players[ownProps.monitor - 1].src
});

const Monitor = connect(mapStateToProps)(monitor);

export default Monitor;
