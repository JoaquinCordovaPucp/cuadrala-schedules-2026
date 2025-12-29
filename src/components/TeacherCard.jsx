import { findHorarioData, formatHourEvent } from "@/data/data"
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function TeacherCard({cursoId, horarioId, setCourseId, isChecked}) {
    const horarioData = findHorarioData(cursoId, horarioId);


    return(
        <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <Checkbox id={`horario-${horarioId}`} checked={isChecked} onCheckedChange={(value) => {
                if(value === true) {
                    setCourseId(cursoId, "add", horarioId)
                } else if (value === false) {
                    setCourseId(cursoId, "remove", horarioId)
                }
            }}/> 
            <div className="flex flex-col">
                <label htmlFor={`horario-${horarioId}`} className=" text-lg font-medium cursor-pointer flex flex-col sm:flex-row sm:items-center">
                    <h3 className="">{horarioData.profesor}</h3>
                    <Badge variant="outline">{horarioId}</Badge>
                </label>
                {horarioData.eventos.map(evento => {
                    const eventoFormat = formatHourEvent(evento.inicio, evento.fin)
                    return(
                        <div className="flex flex-col items-start gap-2 mt-2">
                            <div className="text-sm flex items-center">
                                <Clock className="h-5 w-5 mr-2"/>
                                <p>{eventoFormat.dia}: {eventoFormat.inicioFormat} - {eventoFormat.finFormat}</p>
                            </div>
                            <div className="text-sm flex items-center ">
                                <MapPin className="h-5 w-5 mr-2"/>
                                <p className="text-xs text-muted-foreground">{evento.tipo} - {evento.aula}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}