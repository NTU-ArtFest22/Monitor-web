import { connect } from 'react-redux';
import video from '../Components/Video';
import { setPlayer, sendControlMsg, controlLeft, controlRight, stopControl, controlInteract } from '../Actions/Videos';

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
    },
    controlLeft: (monitor) => {
        dispatch(controlLeft(monitor));
    },
    controlRight: (monitor) => {
        dispatch(controlRight(monitor));
    },
    stopControl: () => {
        dispatch(stopControl());
    },
    controlInteract: () => {
        dispatch(controlInteract());
    }
});

const Video = connect(mapStateToProps, mapDispatchToProps)(video);

export default Video;
