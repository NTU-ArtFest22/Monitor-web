import React from 'react';

import Monitor from '../Containers/Monitor';

const Monitors = ({ players, curMonitor, userRef }) => (
    <div className="monitors">
        {players.map(player => player.src).map( (src, i) => (
            <Monitor key={`monitor${i + 1}`} userRef={userRef} curMonitor={curMonitor} monitor={i + 1} src={src} />
        ))}
    </div>
);

export default Monitors;
