import Steps from './Steps.jsx';
import SelectCourses from './SelectCourses.jsx';
import SelectTeachers from './SelectTeachers.jsx';
import HorariosResults from './HorariosResults.jsx';
import { useState } from 'react';
import { generarCombinaciones } from "../data/functions_copy.js"


const IndexReact = ({cursos }) => {
    const [step, setStep] = useState(0);                // This track the current step in the multi-step process (0: SelectCourses, 1: SelectTeachers, 2: HorariosResults)
    const [selectInfo, setSelectInfo] = useState([]) // {id: cursoId, horarioId: [horario1, horario2, ...]} [{id: "CDR121", horarioId: ["L205", "204"]}, ... ]
    const [events, setEvents] = useState([])            // This stores the generated schedule combinations based on user selections(Then pass to the HorariosResults component (Calendar))
    
    //This function manages the addition and removal of courses and their schedules based on user actions in the SelectCourses and SelectTeachers components.
    const setCourse = (id, action, horario = null) => {
        setSelectInfo(prev => {
            if (action === "remove") {
                if (horario === null) {
                    return prev.filter(curso => curso.id !== id)
                }

                return prev.map(curso => {
                    if (curso.id !== id) return curso

                    return {
                    ...curso,
                    horarioId: curso.horarioId.filter(h => h !== horario)
                    }
                })
            }

            if (action === "add") {
                const cursoExiste = prev.find(curso => curso.id === id)
                if (!cursoExiste) {
                    return prev.concat({
                    id: id,
                    horarioId: horario !== null ? [horario] : []
                    })
                }

                if (horario !== null) {
                    return prev.map(curso => {
                    if (curso.id !== id) return curso

                    if (curso.horarioId.includes(horario)) {
                        return curso
                    }
                    return {
                        ...curso,
                        horarioId: curso.horarioId.concat(horario)
                    }
                    })
                }
                return prev
            }

            if(action === "addAll") { // horario is an array of horarioIds(Add all horarios for a course)
                const cursoExiste = prev.find(curso => curso.id === id)

                if (!cursoExiste) {
                    return prev.concat({
                    id: id,
                    horarioId: horario !== null ? horario : []
                    })
                }

                if (horario !== null) {
                    return prev.map(curso => {
                    if (curso.id !== id) return curso
                    return {
                        ...curso,
                        horarioId: horario
                    }
                    })
                }
            }

            if (action === "removeAll") { // Remove all horarios for a course
            const cursoExiste = prev.find(curso => curso.id === id)
            if (!cursoExiste) return prev

            return prev.map(curso =>
                curso.id === id
                ? { ...curso, horarioId: [] }
                : curso
            )
            }
            return prev
        })
    }

    const handleButtonGeneraComb = () => {
        const combinaciones = generarCombinaciones(selectInfo)
        setEvents(combinaciones)
        setStep(2)
    }
    
    return(
        <div className="min-h-0 flex flex-col items-center px-4 pb-2 w-full">
            <Steps step={step} setStep={setStep} /> 
            {step === 0 && <SelectCourses cursos={cursos} setCourse={setCourse} selectInfo={selectInfo} setStep={setStep}/> }
            {step === 1 && <SelectTeachers selectInfo={selectInfo} setCourse={setCourse} handleButtonGeneraComb={handleButtonGeneraComb} />}
            {step === 2 && <HorariosResults selectInfo={selectInfo} events={events} />} 
        </div>
    )
}   
export default IndexReact;