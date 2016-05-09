import React from 'react';
import { Link } from 'react-router';

const Monitor = ({ active, monitor, counter, src }) => {
    return (
        <Link to={`monitor/${monitor}`} className={'monitor' + (active ? ' active': '')} style={{ backgroundImage: `url('http://admin:bGFiNDI4LTQzMA==@140.112.202.155:9080/stream/snapshot.jpg')` }}>
            <span className="monitor-id">{monitor}</span>
            <span className="online-counter"><i className="material-icons">people</i> {counter}</span>
        </Link>
    );
};

export default Monitor;
