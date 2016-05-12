import React from 'react';
import { Link } from 'react-router';

const Monitor = ({ active, monitor, counter, thumbnail, reload, lastReload }) => {
    return (
        <Link to={{ pathname: '/', query: { monitor } }} className={'monitor' + (active ? ' active': '')} style={{ backgroundImage: `url('${thumbnail}?r=${reload}'), url('${thumbnail}?r=${lastReload}'), url('/favicon.ico')` }}>
            <span className="monitor-id">{monitor}</span>
            <span className="online-counter"><i className="material-icons">people</i> {counter}</span>
        </Link>
    );
};

export default Monitor;
