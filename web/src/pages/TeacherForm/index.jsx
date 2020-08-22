import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import WarnIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import './styles.css';

const TeacherForm = () => {
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');

    const [matter, setMatter] = useState('');
    const [price, setPrice] = useState('');

    const history = useHistory();

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    const addNewScheduleItem = () => {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    };

    const handleCreateClass = (e) => {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            description,
            matter,
            price: Number(price),
            schedule: scheduleItems
        }).then(() => {
            history.push('/');
        }).catch(() => {
            history.push('/');
        });
    };

    const setScheduleItemvalue = (position, field, value) => {
        const updatedScheduleItems = scheduleItems.map((item, index) => {
            if (index === position) {
                return {
                    ...item, [field]: value
                };
            }

            return item;
        });

        setScheduleItems(updatedScheduleItems);
    };

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                name="Ensinar"
                description="O primeiro passo é preencher este formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Imagem de Perfil"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <TextArea
                            name="description"
                            label="Biografia"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="matter"
                            label="Matéria"
                            value={matter}
                            onChange={(e) => setMatter(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Física', label: 'Física' },
                                { value: 'História', label: 'História' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Quimica', label: 'Quimica' }
                            ]}
                        />
                        <Input
                            name="price"
                            label="Custo da sua hora por aula"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>

                        {scheduleItems.map(({ week_day, from, to }, index) => {
                            return (
                                <div key={week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={week_day}
                                        onChange={(e) => setScheduleItemvalue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabádo' }
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={from}
                                        onChange={(e) => setScheduleItemvalue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={to}
                                        onChange={(e) => setScheduleItemvalue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={WarnIcon} alt="Aviso Importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    );
};


export default TeacherForm;
