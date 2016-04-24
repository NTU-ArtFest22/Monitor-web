import React from 'react';

class Video extends React.Component {
    componentDidMount() {
        const { setPlayer, id, src, active } = this.props;

        window.onYouTubeIframeAPIReady = () => {
            setPlayer(new window.YT.Player(id, {
                height: active ? 315 : 157,
                width: active ? 560 : 280,
                videoId: src,
                events: {
                    'onReady': this._onPlayerReady,
                    'onStateChange': this._onPlayerStateChange
                }
            }), id);
        };
    }
    onPlayerReady() {
        console.log('ready');
    }

    render() {
        const { monitor } = this.props;
        return (
            <div id={`monitor${monitor}`}></div>
        );
    }
}

// <iframe src={`http://youtube.com/embed/${src}?autoplay=0&cc_load_policy=1&controls=0&enablejsapi=1&iv_load_policy=3&rel=0&showinfo=0`} width={active ? 560 : 280} height={active ? 315 : 157} frameBorder="0" allowFullScreen></iframe>

export default Video;
