import React from 'react';
import classNames from 'classnames';

class Video extends React.Component {
    render () {
        const { monitor, src, onError, error, togglePause, pause, loading, thumbnail, onLoad, reload } = this.props;

        return (
          <div className={classNames('playerWrapper', { loading })}>
            <div className="player">
              <img id={`monitor${monitor}`}
                src={loading ? '/favicon.ico' : (pause ? thumbnail : (error ? '/favicon.ico' : `${src}?r=${reload}`))}
                onError={() => onError(monitor)}
                onLoad={() => onLoad(monitor)}
                onClick={togglePause} />
                <div className="stream-status">
                  {error
                    ? (<span className="offline">OFFLINE</span>)
                    : (<span className="online">ONLINE</span>)
                  }
                </div>
            </div>

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
