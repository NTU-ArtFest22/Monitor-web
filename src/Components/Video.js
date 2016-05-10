import React from 'react';
import { w3cwebsocket as W3cWebSocket } from 'websocket';

class Video extends React.Component {
    render () {
        const { monitor, src, onError, error, togglePause, pause, thumbnail, onLoad, reload } = this.props;

        return (
            <div className="playerWrapper">
              <img id={`monitor${monitor}`}
                src={pause ? thumbnail : (error ? '/favicon.ico' : `${src}?r=${reload}`)}
                onError={() => onError(monitor)}
                onLoad={() => onLoad(monitor)}
                onClick={togglePause} />
              {/*<div className="player" id={`monitor${monitor}`}>
                {frames.map( (frame, z) => (
                  <img key={`frame${z}`} src={frame} style={{ zIndex: z }} />
                ))}
              </div>*/}
              {/*<div className="playerBlocker" onClick={this.togglePlay.bind(this)}></div>*/}
              {/*<div className="control-group">
                  <div className="left" onMouseDown={() => this.props.controlLeft()} onMouseUp={this.props.stopControl}></div>
                  <div className="right" onMouseDown={() => this.props.controlRight()} onMouseUp={this.props.stopControl}></div>
                  <div className="interact" onClick={this.props.controlInteract}>HIT!</div>
              </div>*/}
            </div>
        );
    }
}

export default Video;
