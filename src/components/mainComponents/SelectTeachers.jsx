import {
  Accordion
} from "@/components/ui/accordion"
import SelectCourseTeachersCard from "../SelectCourseTeachersCard"
import { Button } from "@/components/ui/button"
import { useState } from "react"


export default function SelectTeachers({selectInfo, setCourse, handleButtonGeneraComb}) {
    const isAbleToGenerate = (selectInfo.every(curso => curso.horarioId.length > 0) && selectInfo.length > 0)
    const [expandedCourses, setExpandedCourses] = useState(selectInfo.map(c => c.id)) // This sets the openCourses to be visible, then the callback is called with the new array onValueChange

    return(
        <div className="overflow-y-auto w-full h-full bg-[#F8F7FC] rounded-lg shadow-[0_2px_100px_rgba(0,0,0,0.25)] px-2.5 gap-2 flex flex-col py-3 mb-2">
            <h2 className="text-2xl font-bold">Selecciona tus profesores</h2>
            <p className="text-sm">Selecciona uno o mas profesores por cada curso para obtener las combinaciones.</p>
            <Accordion type="multiple" className="overflow-y-auto gap-2 flex flex-col" value={expandedCourses} onValueChange={setExpandedCourses}>
                {selectInfo.map(curso => {
                    return (
                        <SelectCourseTeachersCard key={`${curso.id}-SelectCourseTeachersCard`} selecCurso={curso} setCourseId={setCourse} /> 
                    )
                })}  
            </Accordion>
                    
            <Button disabled={!isAbleToGenerate} onClick={handleButtonGeneraComb} className="text-white bg-linear-to-br from-[#376ABC] to-[#193156] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md shadow-md">
                Calcula los horarios
            </Button>
        </div>
    )
}