import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import back from '../../assets/images/icons/back.svg';

import './styles.css';

const PageHeader = ({ title, children, name, description }) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={back} alt="Voltar" />
                </Link>
                <strong>{name}</strong>
                <img src={logo} alt="Proffy Logo" />
            </div>

            <div className="header-content">
                <strong>{title}</strong>
                {description && <p>{description}</p>}
                {children}
            </div>
        </header>
    );
};

export default PageHeader;
