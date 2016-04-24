import { connect } from 'react-redux';
import monitors from '../Components/Monitors';
import { switchMonitor } from '../Actions/Monitors';

const mapStateToProps = (state) => ({
    src: state.monitors[state.monitor - 1]
});

const mapDispatchToProps = (dispatch) => ({
    switchMonitor: (monitor) => {
        dispatch(switchMonitor(monitor));
    }
});

const Monitors = connect(mapStateToProps, mapDispatchToProps)(monitors);

export default Monitors;
