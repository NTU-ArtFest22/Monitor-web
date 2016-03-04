import React from 'react';

import Monitor from '../Containers/Monitor';

const Monitors = ({ switchMonitor }) => (
    <div>
        <Monitor monitor={1} switchMonitor={switchMonitor.bind(null, 1)} />
        {", "}
        <Monitor monitor={2} switchMonitor={switchMonitor.bind(null, 2)} />
    </div>
);

export default Monitors;
