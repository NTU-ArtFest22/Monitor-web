import { connect } from 'react-redux';
import monitors from '../Components/Monitors';

const mapStateToProps = (state, ownProps) => ({
    players: state.app.players,
    curMonitor: state.app.monitor
});

const Monitors = connect(mapStateToProps)(monitors);

export default Monitors;
