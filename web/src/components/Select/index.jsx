import React from 'react';

import './styles.css';

const Select = ({ label, name, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} {...rest} defaultValue="">
                <option value="" disabled hidden>{label}</option>

                {options.map(option => {
                    return (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Select;
