import { connect } from 'react-redux';
import monitor from '../Components/Monitor';

const mapStateToProps = (state, ownProps) => ({
    active: state.monitor === ownProps.monitor,
    counter: state.onlineCounter[ownProps.monitor] || 0,
    src: state.monitors[ownProps.monitor - 1]
});

const Monitor = connect(mapStateToProps)(monitor);

export default Monitor;
