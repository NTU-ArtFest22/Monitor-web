import { connect } from 'react-redux';
import monitors from '../Components/Monitors';
import { switchMonitor } from '../Actions/Monitors';

const mapStateToProps = (state) => ({
    players: state.players,
    curMonitor: state.monitor
});

const Monitors = connect(mapStateToProps)(monitors);

export default Monitors;
