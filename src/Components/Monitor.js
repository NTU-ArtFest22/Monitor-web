import React from 'react';
import { Link } from 'react-router';

const Monitor = ({ active, monitor, counter, thumbnail, reload }) => {
    return (
        <Link to={`monitor/${monitor}`} className={'monitor' + (active ? ' active': '')} style={{ backgroundImage: `url('${thumbnail}'), url('/favicon.ico')` }}>
            <span className="monitor-id">{monitor}</span>
            <span className="online-counter"><i className="material-icons">people</i> {counter}</span>
        </Link>
    );
};

export default Monitor;
