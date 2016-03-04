import React from 'react';

const Monitor = ({ active, monitor, switchMonitor }) => {
    if (active) {
        return (<span>{monitor}</span>);
    }
    else {
        return (<a href="#" onClick={switchMonitor}>{monitor}</a>);
    }
};

export default Monitor;
