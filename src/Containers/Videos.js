import { connect } from 'react-redux';
import videos from '../Components/Videos';

const mapStateToProps = (state) => ({
    monitors: state.monitors,
    players: state.players
});

const Videos = connect(mapStateToProps)(videos);

export default Videos;
