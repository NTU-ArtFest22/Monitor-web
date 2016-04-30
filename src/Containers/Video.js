import { connect } from 'react-redux';
import video from '../Components/Video';
import { setPlayer } from '../Actions/Videos';

const mapStateToProps = (state, ownProps) => ({
    src: state.players[state.monitor - 1].src
});

const mapDispatchToProps = (dispatch) => ({
    setPlayer: (player, monitor) => {
        dispatch(setPlayer(player, monitor));
    }
});

const Video = connect(mapStateToProps, mapDispatchToProps)(video);

export default Video;
