import React from 'react';

import Monitor from '../Containers/Monitor';

const Monitors = ({ players, curMonitor }) => (
    <div className="monitors">
        {players.keySeq().map(i => (
            <Monitor key={`monitor${i}`} curMonitor={curMonitor} monitor={i} />
        )).toArray()}
    </div>
);

export default Monitors;
