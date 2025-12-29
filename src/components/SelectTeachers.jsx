import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import SelectCourseTeachersCard from "./SelectCourseTeachersCard"
import { cu } from "node_modules/@fullcalendar/core/internal-common"
import { Button } from "@/components/ui/button"


export default function SelectTeachers({selectInfo, setCourse, handleButtonGeneraComb}) {

    const isAbleToGenerate = (selectInfo.every(curso => curso.horarioId.length > 0) && selectInfo.length > 0)

    return(
        <div className="w-full min-h-0 bg-[#F8F7FC] rounded-lg shadow-[0_2px_100px_rgba(0,0,0,0.25)] px-2.5 gap-2 flex flex-col py-4 mb-4">
            <h2 className="text-2xl font-bold">Selecciona tus profesores</h2>
            <p className="text-sm">Selecciona uno o mas profesores por cada curso para obtener las combinaciones.</p>
            <div className="overflow-y-auto gap-2 flex flex-col">
                {selectInfo.map(curso => {
                    return (
                        <SelectCourseTeachersCard selecCurso={curso} setCourseId={setCourse} /> 
                    )
                })}  
            </div>
            
            
            <Button disabled={!isAbleToGenerate} onClick={handleButtonGeneraComb} className="text-white bg-linear-to-br from-[#376ABC] to-[#193156] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md shadow-md">
                Calcula los horarios
            </Button>
        </div>
    )
}