import { connect } from 'react-redux';
import monitors from '../Components/Monitors';
import { switchMonitor } from '../Actions/Monitors';

const mapDispatchToProps = (dispatch) => ({
    switchMonitor: (monitor) => {
        dispatch(switchMonitor(monitor));
    }
});

const Monitors = connect(null, mapDispatchToProps)(monitors);

export default Monitors;
