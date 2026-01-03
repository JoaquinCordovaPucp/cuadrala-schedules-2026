import {
  Accordion
} from "@/components/ui/accordion"
import SelectCourseTeachersCard from "../SelectCourseTeachersCard"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import MainComponentLayout from "./MainComponentLayout.jsx"


export default function SelectTeachers({selectInfo, setCourse, handleButtonGeneraComb}) {
    const isAbleToGenerate = (selectInfo.every(curso => curso.horarioId.length > 0) && selectInfo.length > 0)
    const [expandedCourses, setExpandedCourses] = useState(selectInfo.map(c => c.id)) // This sets the openCourses to be visible, then the callback is called with the new array onValueChange

    return(
        <MainComponentLayout>
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
        </MainComponentLayout>
    )
}