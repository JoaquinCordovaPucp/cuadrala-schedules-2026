
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Badge } from '@/components/ui/badge'
import { ArrowDownToLine, ArrowUpToLine } from 'lucide-react'
import { useRef } from 'react'

export default function Calendar({ events }) {
  const newEvents = events.map(ev => ({
    ...ev,
    backgroundColor:
      ev.type === "EXA"
        ? "rgba(239, 68, 68, 0.5)" // rojo tenue
        : "#325FA8",
    borderColor:
      ev.type === "EXA"
        ? "rgba(239, 68, 68, 0.1)" // rojo tenue
        : "#325FA8",
  }))

  return (
    <div className=''>
      <FullCalendar
        height= 'auto'
        locale='es'
        slotLabelFormat={{
          hour: "numeric",
          hour12: true
        }}
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
        headerToolbar={false}   
        initialDate="2024-01-01"
        allDaySlot={false} 
        events={newEvents}
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
  const start = eventInfo.timeText.split(" - ")[0]
  const end = eventInfo.timeText.split(" - ")[1]
  console.log(eventInfo)
  return (
    <div className='text-[0.6rem] flex flex-col items-center justify-start w-full h-full gap-0.5 py-0.5 overflow-hidden'>
      <i className='font-bold'>{eventInfo.event.title}</i>
      <Badge variant='outline text-white' className='text-[0.5rem] border-[0.5px] px-1 py-0 mb-0.5'>{eventInfo.event.extendedProps.horarioId}</Badge>                
      {eventInfo.event.extendedProps.type != "EXA" && 
      (
      <>
      <span className="text-[0.6rem] flex items-center font-thin">
        <ArrowDownToLine size={9} strokeWidth={1} />
        {": " + start}
      </span>
      <span className="text-[0.6rem] flex items-center  font-thin">
        <ArrowUpToLine size={9} strokeWidth={1} />
        {": " + end}
      </span>
      </>)}
      <p className="text-[0.6rem] flex items-center  font-thin">{eventInfo.event.extendedProps.type}</p>
    </div>
  )
}