import { connect } from 'react-redux';
import video from '../Components/Video';
import { setPlayer, sendControlMsg, controlLeft, controlRight,
  stopControl, controlInteract, onError, onLoad, updateFrames, pause }
  from '../Actions/Videos';

const mapStateToProps = (state, ownProps) => ({
    src: state.app.players.get(state.app.monitor.toString()).src,
    ws: state.app.players.get(state.app.monitor.toString()).ws,
    thumbnail: state.app.players.get(state.app.monitor.toString()).thumbnail,
    frames: state.app.players.get(state.app.monitor.toString()).frames,
    player: state.app.player,
    monitor: state.app.monitor,
    error: state.app.players.get(state.app.monitor.toString()).error,
    pause: state.app.pause
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
    onError: monitor => {
      dispatch(onError(monitor));
    },
    onLoad: monitor => {
      dispatch(onLoad(monitor));
    },
    updateFrames: (monitor, src) => {
      dispatch(updateFrames(monitor, src));
    },
    togglePause: () => {
      dispatch(pause());
    }
});

const Video = connect(mapStateToProps, mapDispatchToProps)(video);

export default Video;
