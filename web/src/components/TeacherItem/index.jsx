/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

const TeacherItem = ({ id, name, avatar, matter, price, description, whatsapp }) => {
    const createNewConnection = () => {
        api.post('connections', {
            user_id: id
        });
    };

    return (
        <article className="teacher-item">
            <header>
                <img src={avatar} alt={name} />
                <div>
                    <strong>{name}</strong>
                    <span>{matter}</span>
                </div>
            </header>

            <p>{description}</p>
            <footer>
                <p>Preço/hora<strong>R$ {price.toLocaleString()}</strong></p>
                <a
                    onClick={createNewConnection}
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                >
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                        </a>
            </footer>
        </article>
    );
};

export default TeacherItem;
