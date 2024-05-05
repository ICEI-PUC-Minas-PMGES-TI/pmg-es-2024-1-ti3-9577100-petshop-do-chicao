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
                    const { id, servico, cliente, pet, horario, observacoes } = item;
                    return { id, title: `${servico} - ${cliente} - ${pet}`, start: horario, extendedProps: { observacoes } };
                });
                setEvents(eventsData);
            });
    }, []);

    useEffect(() => {
        const calendar = new Calendar(document.getElementById('calendar'), {
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
            initialView: 'timeGridWeek',
            events: events,
            eventClick: (info) => {
                console.log('Event clicked:', info.event.title);
            },
            dateClick: (info) => {
                handleDateClick(info);
            },
        });

        calendar.render();

        setCalendarApi(calendar);
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
        const newEvent = { title: '', date, extendedProps: { hora } };
        handleAgendamentoClick({ ...newEvent, start: date.toISOString() });
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
