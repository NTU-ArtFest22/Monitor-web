import { connect } from 'react-redux';
import monitors from '../Components/Monitors';

const mapStateToProps = (state) => ({
    players: state.app.players,
    curMonitor: state.app.monitor,
    userRef: state.app.userRef
});

const Monitors = connect(mapStateToProps)(monitors);

export default Monitors;
