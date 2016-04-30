import React from 'react';

const Monitor = ({ active, monitor, counter, switchMonitor, src }) => {
    return (
        <a className="monitor" onClick={switchMonitor}>
            <img src={`http://img.youtube.com/vi/${src}/mqdefault.jpg`} />
            <p>{monitor}:{counter}</p>
        </a>
    );
};

export default Monitor;
