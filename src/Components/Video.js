import React from 'react';
import Youtube from 'react-youtube';

class Video extends React.Component {
    _onReady(event) {
        if (this.props.active) {
            event.target.playVideo();
        }

        // this.props.setPlayer(event.target, this.props.monitor);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.player) {
            if (nextProps.active) {
                this.props.player.playVideo();
            }
            else {
                this.props.player.stopVideo();
            }
        }
    }

    render() {
        const { src, monitor, active } = this.props;
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
            <Youtube videoId={src} className="player" id={`monitor${monitor}`} opts={opts} onReady={this._onReady.bind(this)} />
        );
    }
}

export default Video;
