import React from 'react';

import Monitor from '../Containers/Monitor';

const Monitors = ({ players, switchMonitor }) => (
    <div className="monitors">
        {players.map(player => player.src).map( (src, i) => (
            <Monitor key={`monitor${i + 1}`} monitor={i + 1} src={src} switchMonitor={switchMonitor.bind(null, i + 1)} />
        ))}
    </div>
);

export default Monitors;
