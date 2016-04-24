import React from 'react';

const Monitor = ({ active, monitor, counter, switchMonitor, src }) => {
    if (active) {
        return (<span>{monitor}:{counter}</span>);
    }
    else {
        return (<a href={'#' + monitor} onClick={switchMonitor}>{monitor}:{counter}</a>);
    }
};

export default Monitor;
