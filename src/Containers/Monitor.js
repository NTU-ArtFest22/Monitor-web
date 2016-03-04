import { connect } from 'react-redux';
import monitor from '../Components/Monitor';

const mapStateToProps = (state, ownProps) => ({
    active: state.monitor === ownProps.monitor
});

const Monitor = connect(mapStateToProps)(monitor);

export default Monitor;
