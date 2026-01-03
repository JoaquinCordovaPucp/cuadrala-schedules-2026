import { formatHourEvent } from "@/data/functions"
import { Badge } from "@/components/ui/badge.jsx"
import { Clock, School } from "lucide-react"

export default function ResultHorarioCard({ horario }) {

    return(
        <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            {/* <Checkbox id={`horario-${horarioId}`} checked={isChecked} onCheckedChange={(value) => {
                if(value === true) {
                    setCourseId(cursoId, "add", horarioId)
                } else if (value === false) {
                    setCourseId(cursoId, "remove", horarioId)
                }
            }}/>  */}
            <div className="flex flex-col">
                <label htmlFor={`horario-${horario.horarioId}`} className="font-semibold cursor-pointer flex flex-col md:justify-start">
                    <h3 className="">{horario.profesor}</h3>
                    <Badge variant="outline">{horario.horarioId}</Badge>
                </label>
                {horario.eventos.map(evento => {
                    const eventoFormat = formatHourEvent(evento.inicio, evento.fin)
                    return(
                        <div className="flex flex-col items-start gap-2 mt-2">
                            <div className="text-sm flex items-center">
                                <Clock className="h-5 w-5 mr-2"/>
                                <p>{eventoFormat.dia}: {eventoFormat.inicioFormat} - {eventoFormat.finFormat}</p>
                            </div>
                            <div className="text-sm flex items-center ">
                                <School className="h-5 w-5 mr-2"/>
                                <p className="text-xs text-muted-foreground">{evento.tipo}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// HEY! THIS IS VERY SIMILAR TO THE TeacherCard COMPONENT. MAYBE YOU CAN MAKE A SINGLE COMPONENT FOR BOTH.(JUST DIFFERENT BC OF THE CHECKBOX)