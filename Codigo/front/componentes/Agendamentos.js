import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    Button,
    ChakraProvider,
    Container,
    Input,
    useDisclosure
} from '@chakra-ui/react';
import { RangeDatepicker, SingleDatepicker } from "chakra-dayzed-datepicker";
import React, { useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FormsAgendamento from "@/componentes/FormsAgendamento";
import FormsEditaAgendamento from "@/componentes/FormsEditaAgendamento";
import FormsServico from "@/componentes/FormsServico";
import '../app/agendamento/agendamento.css';
import { TimeIcon } from "@chakra-ui/icons";

export default function Agendamentos() {
    const [calendarApi, setCalendarApi] = useState(null);
    const [events, setEvents] = useState([]);
    const [AgendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
    const [isOpenDadosAgendamento, setIsOpenDadosAgendamento] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [Agendamento, setAgendamento] = useState([]);
    const cancelRef = React.useRef();
    const [isOpenNovoAgendamento, setIsOpenNovoAgendamento] = useState(false);
    const [isOpenEditAgendamento, setIsOpenEditAgendamento] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8081/agendamento')
            .then(response => response.json())
            .then(data => {
                const eventsData = data.map(item => {
                    const { id, servico, cliente, pet, horario, duracao, observacoes } = item;
                    const start = new Date(horario);
                    console.log(duracao + " -> " + servico);
                    if (duracao) {
                        const [horas, minutos, segundos] = duracao.split(':').map(Number);
                        const duracaoEmHoras = horas + (minutos / 60) + (segundos / 3600);
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
                handleEventClick(info.event);
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

    const handleEventClick = (event) => {
        setAgendamentoSelecionado(event);
        setIsOpenEditAgendamento(true);
    };

    const handleAgendamentoClick = (newEvent) => {
        setAgendamentoSelecionado(newEvent);
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

        handleAgendamentoClick(start);
    };

    const updateEvent = (updatedEvent) => {
        calendarApi.getEventById(updatedEvent.id).remove();
        calendarApi.addEvent(updatedEvent);
    };

    const handleNovoAgendamentoClick = () => {
        setIsOpenNovoAgendamento(true);
    };

    const handleCloseNovoAgendamento = () => {
        setIsOpenNovoAgendamento(false);
    };

    const [isOpenNovoServico, setIsOpenNovoServico] = useState(false);

    const handleNovoServicoClick = () => {
        setIsOpenNovoServico(true);
    };

    const handleCloseNovoServico = () => {
        setIsOpenNovoServico(false);
    };

    return (
        <ChakraProvider>
            <Button
                mx='auto'
                colorScheme='red'
                size='md'
                borderRadius='lg'
                position={'absolute'}
                top={'10%'}
                left={'45%'}
                onClick={handleNovoServicoClick}
            >
                Novo Serviço
            </Button>
            <Button
                mx='auto'
                colorScheme='red'
                size='md'
                borderRadius='lg'
                position={'absolute'}
                top={'10%'}
                left={'55%'}
                onClick={handleNovoAgendamentoClick}
            >
                Novo Agendamento
            </Button>
            <Container
                height={'90vh'}
                width={'100vw'}
                position={'absolute'}
                top={'60%'}
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
            {isOpenNovoAgendamento && (
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={handleCloseNovoAgendamento}
                    isOpen={isOpenNovoAgendamento}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <FormsAgendamento />
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            {isOpenNovoServico && (
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={handleCloseNovoServico}
                    isOpen={isOpenNovoServico}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <FormsServico />
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            {isOpenEditAgendamento && (
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={() => setIsOpenEditAgendamento(false)}
                    isOpen={isOpenEditAgendamento}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            {AgendamentoSelecionado && AgendamentoSelecionado.title && <FormsEditaAgendamento agendamento={AgendamentoSelecionado} />}
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </ChakraProvider>
    );
}