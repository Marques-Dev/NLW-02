import React from 'react';

import './styles.css';

const TextArea = ({ label, name, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea type="text" id={name} {...rest} />
        </div>
    );
};

export default TextArea;
