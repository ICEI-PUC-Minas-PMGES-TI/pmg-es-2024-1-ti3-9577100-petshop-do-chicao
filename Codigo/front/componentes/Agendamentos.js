import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    ChakraProvider,
    Container,
    Input, useDisclosure
} from '@chakra-ui/react';
import {RangeDatepicker, SingleDatepicker} from "chakra-dayzed-datepicker";
import React, { useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FormsAgendamento from "@/componentes/FormsAgendamento";
import '../app/agendamento/agendamento.css';
import {TimeIcon} from "@chakra-ui/icons";

export default function Agendamentos() {
    const [calendarApi, setCalendarApi] = useState(null);
    const [events, setEvents] = useState([]);
    const [AgendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
    const [isOpenDadosAgendamento, setIsOpenDadosAgendamento] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [Agendamento, setAgendamento] = useState([]);
    const cancelRef = React.useRef();

    useEffect(() => {
        fetch('http://localhost:8081/agendamento')
            .then(response => response.json())
            .then(data => {
                const eventsData = data.map(item => {
                    const { id, servico, cliente, pet, horario, duracao, observacoes } = item;
                    const start = new Date(horario);
                    if (duracao) {
                        const [horas, minutos, segundos] = duracao.split(':').map(Number);
                        const duracaoEmHoras = horas + minutos + segundos / 60;
                        const end = new Date(start.getTime() + duracaoEmHoras * 60 * 60 * 1000).toISOString();
                        return { id, title: `${servico} - ${cliente} - ${pet}`, start, end, extendedProps: { observacoes, duracao } };
                    } else {
                        console.error('duracao is null');
                        const end = 0
                        return { id, title: `${servico} - ${cliente} - ${pet}`, start, end, extendedProps: { observacoes, duracao } };
                    }

                });
                setEvents(eventsData);
            });
    }, []);

    useEffect(() => {
        const INITIAL_VIEW = 'timeGridWeek';
        const PLUGINS = [dayGridPlugin, interactionPlugin, timeGridPlugin];

        const fullCalendar = new Calendar(document.getElementById('calendar'), {
            plugins: PLUGINS,
            initialView: INITIAL_VIEW,
            events: events,
            eventClick: (info) => {
                console.log('Event clicked:', info.event.title);
            },
            dateClick: (info) => {
                handleDateClick(info);
            },
            // Configure the time grid to display 30-minute slots
            slotDuration: '00:30:00',
            slotLabelInterval: '00:30:00',
        });

        fullCalendar.render();

        setCalendarApi(fullCalendar);
    }, [events]);

    const handleAgendamentoClick = (Agendamento) => {
        setAgendamentoSelecionado(Agendamento);
        setIsOpenDadosAgendamento(true);
    };

    const handleCloseDadosAgendamento = () => {
        setAgendamentoSelecionado(null);
        setIsOpenDadosAgendamento(false);
    };

    const handleDateClick = (info) => {
        const date = info.date;
        const hora = date.toLocaleTimeString();
        const start = new Date(date).toISOString(); // convert date to Date object and then to ISOString
        const newEvent = { title: '', start, extendedProps: { hora } };

        if (AgendamentoSelecionado) {
            const duracao = AgendamentoSelecionado.extendedProps.duracao;
            const end = new Date(start.getTime() + duracao * 60 * 1000).toISOString();
            newEvent.end = end;
        }

        handleAgendamentoClick(newEvent);
    };

    const updateEvent = (updatedEvent) => {
        calendarApi.getEventById(updatedEvent.id).remove();
        calendarApi.addEvent(updatedEvent);
    };

    return (
        <ChakraProvider>
            <Container
                height={'90vh'}
                width={'100vw'}
                position={'absolute'}
                top={0}
                left={'20%'}
                padding={0}
                margin={0}
            >
                <div className="App">
                    <div id="calendar" style={{ width: '70vw', height: '90vh', margin: '0' }} />
                </div>
            </Container>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={handleCloseDadosAgendamento}
                isOpen={isOpenDadosAgendamento}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {AgendamentoSelecionado && <FormsAgendamento Agendamento={Agendamento} />}
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </ChakraProvider>


    );
}
