import { connect } from 'react-redux';
import video from '../Components/Video';
import { setPlayer, sendControlMsg, controlLeft, controlRight, stopControl, controlInteract, onError } from '../Actions/Videos';

const mapStateToProps = (state, ownProps) => ({
    src: state.app.players[state.app.monitor - 1].src,
    player: state.app.player,
    error: state.app.players[state.app.monitor - 1].error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
    },
    onError: () => {
      dispatch(onError(ownProps.monitor));
    }
});

const Video = connect(mapStateToProps, mapDispatchToProps)(video);

export default Video;
