import { connect } from 'react-redux';
import video from '../Components/Video';
import { setPlayer, sendControlMsg } from '../Actions/Videos';

const mapStateToProps = (state, ownProps) => ({
    src: state.players[state.monitor - 1].src,
    player: state.player
});

const mapDispatchToProps = (dispatch) => ({
    setPlayer: (player, monitor) => {
        dispatch(setPlayer(player, monitor));
    },
    sendControlMsg: (msg, monitor) => {
        dispatch(sendControlMsg(msg, monitor));
    }
});

const Video = connect(mapStateToProps, mapDispatchToProps)(video);

export default Video;
