import React from 'react';
import Video from '../Containers/Video.js';

class Videos extends React.Component {
    render() {
        const { monitors, players } = this.props;

        return (
            <div className="players">
                {players.map( (player, i) => (
                    <Video key={player.src} src={player.src} monitor={i + 1} />
                ))}
            </div>
        );
    }
}

export default Videos;
