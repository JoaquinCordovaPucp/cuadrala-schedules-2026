import { useState } from 'react';
import { findHorario } from '@/data/functions.js';
import Calendar from '../Calendar.jsx';
import ResultHorarioCard from '../ResultHorarioCard.jsx';
import { ButtonGroup } from '../ui/button-group.js';
import { Button } from '../ui/button.js';
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from '../ui/alert.js';
import { AlertCircleIcon } from 'lucide-react';
import MainComponentLayout from './MainComponentLayout.jsx';


export default function HorarioResults({ events }) {
    
    const eventsLength = events.length
    const[indexEvent, setIndexEvent] = useState(0)
    
    const handleButton = (event) => {
        if(event === "prev"){
            if(indexEvent > 0 ){
                setIndexEvent(prev => prev - 1)
            } else {
                return
            }
        } else if(event === "next") {
            if(indexEvent < eventsLength - 1){
                setIndexEvent(prev => prev + 1)
            }
            else {
                return
            }
        }
    }

    return( eventsLength > 0 ?
        (<MainComponentLayout>
            <div className='flex flex-row w-full justify-between'>
                <h3 className='font-bold text-xl'>Horario {indexEvent + 1 } de {eventsLength}</h3>
                <ButtonGroup>
                    <Button variant="outline" disabled={indexEvent === 0} onClick={() => handleButton("prev")}><ArrowLeftIcon /></Button>
                    <Button variant="outline" disabled={indexEvent === eventsLength - 1} onClick={() => handleButton("next")}><ArrowRightIcon /></Button>
                </ButtonGroup>
            </div>
            <Calendar events={events[indexEvent]} />
            <h2 className='font-bold text-lg'>Resumen del horario</h2>
            {events[indexEvent].map((evento, i, arr) => {
                if (i > 0 && evento.title === events[indexEvent][i-1].title){ // Debido a que solo necesito 1 evento por curso para saber el curso y el horario, solo me quedo con el primero, los demas los ignoro
                    return
                }
                const h = findHorario(evento.title, evento.horarioId)
                return(
                    <>
                    <ResultHorarioCard horario={h} />
                    </>
                )
                
            })}
        </MainComponentLayout> )
        : 
        (<Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>No combinaciones disponibles.</AlertTitle>
            <AlertDescription>
                <p>Por favor elige otros profesores u horarios.</p>
                <ul className="list-inside list-disc text-sm">
                    <li>Cambia de cursos</li>
                    <li>Cambia de profesores</li>
            </ul>
            </AlertDescription>
        </Alert>)
    )
}
