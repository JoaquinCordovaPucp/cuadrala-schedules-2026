import { findHorarioData, formatHourEvent } from "@/data/functions"
import { Badge } from "@/components/ui/badge";
import { Clock, School } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function TeacherCard({cursoId, horarioId, setCourseId, isChecked}) {
    const horarioData = findHorarioData(cursoId, horarioId);

    return(
        <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <Checkbox id={`horario-${horarioId}-${cursoId}`} className="mt-0.5" checked={isChecked} onCheckedChange={(value) => {
                if(value === true) {
                    setCourseId(cursoId, "add", horarioId)
                } else if (value === false) {
                    setCourseId(cursoId, "remove", horarioId)
                }
            }}/> 
            <div className="flex-1">
                <label htmlFor={`horario-${horarioId}-${cursoId}`} className="font-semibold cursor-pointer flex flex-col md:justify-start">
                    <span className="text-base">{horarioData.profesor}</span>
                    <Badge variant="outline">{horarioId}</Badge>
                </label>
                {horarioData.eventos.map((evento, index) => {
                    const eventoFormat = formatHourEvent(evento.inicio, evento.fin)
                    return(
                        <div className="flex flex-col items-start gap-1 mt-2" key={`${cursoId}-${horarioId}-evento-${index}`}>
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