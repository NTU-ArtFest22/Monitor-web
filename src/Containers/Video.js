import { connect } from 'react-redux';
import video from '../Components/Video';
import { setPlayer } from '../Actions/Videos';

const mapStateToProps = (state, ownProps) => ({
    active: state.monitor === ownProps.monitor,
    player: state.players[`monitor${ownProps.monitor}`].player
});

const mapDispatchToProps = (dispatch) => ({
    setPlayer: (player, monitor) => {
        dispatch(setPlayer(player, monitor));
    }
});

const Video = connect(mapStateToProps, mapDispatchToProps)(video);

export default Video;
