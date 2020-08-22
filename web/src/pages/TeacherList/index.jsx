import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);

    const [matter, setMatter] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const searchTeachers = async (e) => {
        e.preventDefault();

        const { data } = await api.get('classes', {
            params: { matter, week_day, time }
        });

        console.log(data);
        setTeachers(data);
    };

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys disponíveis." name="Estudar" >
                <form id="search-teachers" onSubmit={searchTeachers}>
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
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => setWeekDay(e.target.value)}
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
                        name="time"
                        label="Hora"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map(({ id, name, avatar, matter, price, description, whatsapp }) => {
                    return (
                        <TeacherItem
                            key={id}
                            id={id}
                            avatar={avatar}
                            name={name}
                            matter={matter}
                            price={price}
                            whatsapp={whatsapp}
                            description={description}
                        />
                    );
                })}
            </main>
        </div>
    );
};

export default TeacherList;
