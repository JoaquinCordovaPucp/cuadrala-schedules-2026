import React from 'react'
import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Badge } from '@/components/ui/badge'




export default function Calendar({ events }) {
  return (
    <div className='h-full w-full'>
      <FullCalendar
        // titleFormat={date => renderTitle(date)}
        plugins={[timeGridPlugin]}
        height="90%"
        initialView='timeGridWeek'
        headerToolbar={false}   
        initialDate="2024-01-01"
        allDaySlot={false} 
        events={events}
        firstDay={1}
        hiddenDays={[0]} 
        dayHeaderFormat={{ weekday: "short" }}
        eventContent={renderEventContent}
        eventColor='#325FA8'
        slotMinTime="07:00:00"
        slotMaxTime="22:00:00"
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <div className='text-xs flex flex-col items-start justify-start w-full h-full'>
      <b className=''>{eventInfo.timeText}</b>
      <i className='font-bold'>{eventInfo.event.title}</i>
      <Badge variant='outline text-white'>{eventInfo.event.extendedProps.horarioId}</Badge>                
      {/* NEED TO IMPORT THE HORARIO ID DINAMICALLY HERE  */}
    </div>
  )
}

{/* <FullCalendar
  plugins={[dayGridPlugin]}
  initialView='dayGridMonth'
  weekends={false}
  events={events}
  eventContent={renderEventContent}
/> */}