import React from 'react';
import Video from '../Containers/Video.js';

class Videos extends React.Component {
    componentDidMount() {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    render() {
        const { monitors } = this.props;

        return (
            <div>
                {monitors.map( (src, i) => (
                    <Video key={src} src={src} monitor={i + 1} />
                ))}
            </div>
        );
    }
}

export default Videos;
