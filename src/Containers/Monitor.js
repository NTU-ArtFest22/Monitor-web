import { connect } from 'react-redux';
import monitor from '../Components/Monitor';

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.curMonitor.toString() === ownProps.monitor.toString(),
    counter: state.app.onlineCounter.get(ownProps.monitor.toString()) || 0,
    thumbnail: state.app.players.get(ownProps.monitor.toString()).thumbnail
});

const Monitor = connect(mapStateToProps)(monitor);

export default Monitor;
