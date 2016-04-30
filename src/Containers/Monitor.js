import { connect } from 'react-redux';
import monitor from '../Components/Monitor';

const mapStateToProps = (state, ownProps) => ({
    active: state.monitor === ownProps.monitor,
    counter: state.onlineCounter[ownProps.monitor] || 0,
    src: state.players[ownProps.monitor - 1].src
});

const Monitor = connect(mapStateToProps)(monitor);

export default Monitor;
