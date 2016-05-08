import React from 'react';
import Youtube from 'react-youtube';

class Video extends React.Component {
    _onReady(event) {
        if (this.props.active) {
            event.target.playVideo();
        }

        this.props.setPlayer(event.target);
    }
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.player) {
    //         if (nextProps.active) {
    //             this.props.player.playVideo();
    //         }
    //         else {
    //             this.props.player.stopVideo();
    //         }
    //     }
    // }
    togglePlay() {
        const { player } = this.props;
        if (player) {
            if (player.getPlayerState() === 1) {
                player.pauseVideo();
            }
            else {
                player.playVideo();
            }
        }
    }

    render() {
        const { src, monitor } = this.props;
        const opts = {
            playerVars: {
                cc_load_policy: 1,
                controls: 0,
                enablejsapi: 1,
                iv_load_policy: 3,
                rel: 0,
                showinfo: 0,
                autoplay: 1
            }
        };

        return (
            <div className="playerWrapper">
                <Youtube videoId={src} className="player" id={`monitor${monitor}`} opts={opts} onReady={this._onReady.bind(this)} />
                <div className="playerBlocker" onClick={this.togglePlay.bind(this)}></div>
                <div className="control-group">
                    <div className="left" onMouseDown={() => this.props.controlLeft()} onMouseUp={this.props.stopControl}></div>
                    <div className="right" onMouseDown={() => this.props.controlRight()} onMouseUp={this.props.stopControl}></div>
                    <div className="interact" onClick={this.props.controlInteract}>HIT!</div>
                </div>
            </div>
        );
    }
}

export default Video;
