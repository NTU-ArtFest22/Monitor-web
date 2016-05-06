import React from 'react';

const Monitor = ({ active, monitor, counter, switchMonitor, src }) => {
    return (
        <a className={'monitor' + (active ? ' active': '')} onClick={switchMonitor} style={{ backgroundImage: `url('http://img.youtube.com/vi/${src}/mqdefault.jpg')` }}>
            <span className="monitor-id">{monitor}</span>
            <span className="online-counter"><i className="material-icons">people</i> {counter}</span>
        </a>
    );
};

export default Monitor;
