import { useState } from 'react';
import CalendarNInputs from '../components/CalendarNInputs.jsx';
import { data, cursos } from '../data/data.js'
import { findHorario } from '@/data/functions_copy.js';
import Calendar from './Calendar.jsx';
import ResultHorarioCard from './ResultHorarioCard.jsx';
import { ButtonGroup } from './ui/button-group.js';
import { Button } from './ui/button.js';
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"


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

    return(
        <div className="overflow-y-auto w-full h-full bg-[#F8F7FC] rounded-lg shadow-[0_2px_100px_rgba(0,0,0,0.25)] px-2.5 gap-2 flex flex-col py-4 mb-6">
            <div className='flex flex-row w-full justify-between'>
                <h3 className='font-bold text-xl'>Horario {indexEvent + 1 } de {eventsLength}</h3>
                <ButtonGroup>
                    <Button variant="outline" onClick={() => handleButton("prev")}><ArrowLeftIcon /></Button>
                    <Button variant="outline" onClick={() => handleButton("next")}><ArrowRightIcon /></Button>
                </ButtonGroup>
            </div>
            <Calendar events={events[indexEvent]} />
            <h2 className='font-bold text-lg'>Resumen del horario</h2>
            {events[indexEvent].map((evento, i, arr) => {
                if (i > 0 && evento.title === events[indexEvent][i-1].title){
                    return
                }
                const h = findHorario(evento.title, evento.horarioId)
                console.log("h", h)
                return(
                    <>
                    <ResultHorarioCard horario={h} />
                    </>
                )
                
            })}
        </div>
    )
}




// TODO: Add the course id to the badge to reander in FullCalendar events.