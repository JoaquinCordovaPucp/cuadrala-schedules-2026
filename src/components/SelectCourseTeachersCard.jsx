
import { findCourse } from "@/data/data";
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button";
import TeacherCard from "./TeacherCard";
import { Star } from "lucide-react";
import { StarOff } from "lucide-react";


export default function SelectCourseTeachersCard({selecCurso, setCourseId}) {
    const { id, horarioId } = selecCurso;
    const cursoData = findCourse(id);
    return(
        <div className="w-full bg-[#F8F7FC] rounded-lg border px-2.5 gap-2 flex flex-col py-3">
            <h2 className="text-xl font-semibold">{cursoData.title}</h2>
            <Badge variant="outline">{id}</Badge>
            {cursoData.horarios.map(horario => {
                return(
                    <TeacherCard 
                        horarioId={horario.horarioId} 
                        cursoId={id} 
                        setCourseId={setCourseId} 
                        isChecked={horarioId.some(h => h === horario.horarioId)}/>
                )
            })}
            <div className="w-full flex flex-row items-center">
                <p className="ml-4">{horarioId.length} de {cursoData.horarios.length} profesores seleccionados </p>
                <div className="grid grid-row-2 gap-1" >
                    <Button size="sm" onClick={() => setCourseId(id, "addAll", cursoData.horarios.map(horario => horario.horarioId))} className="" variant="outline">
                        <Star />
                        <p className="text-xs">Seleccionar todos</p>
                    </Button>
                    <Button size="sm" onClick={() => setCourseId(id, "removeAll")} variant="outline" >
                        <StarOff />
                        <p className="text-xs">Limpiar selección</p>
                    </Button>
                </div>
            </div>
        </div>
    )
     
}