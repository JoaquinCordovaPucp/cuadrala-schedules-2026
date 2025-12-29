import Steps from './Steps.jsx';
import SelectCourses from './SelectCourses.jsx';
import SelectTeachers from './SelectTeachers.jsx';
import HorariosResults from './HorariosResults.jsx';
import { useState } from 'react';
import { generarCombinaciones } from "../data/functions_copy.js"






const Index = ({cursos }) => {
    
    const [step, setStep] = useState(0);
    const [selectInfo, setSelectInfo] = useState([
        // {
        //     id: "none",
        //     horarioId: [0]
        // }, 
        // {
        //     id: "none",
        //     horarioId: [0]
        // }
    ])

    const setCourse = (id, action, horario = null) => {
    setSelectInfo(prev => {

        // 🔴 REMOVE
        if (action === "remove") {

        // quitar curso completo
        if (horario === null) {
            return prev.filter(curso => curso.id !== id)
        }

        // quitar solo un horario
        return prev.map(curso => {
            if (curso.id !== id) return curso

            return {
            ...curso,
            horarioId: curso.horarioId.filter(h => h !== horario)
            }
        })
        }

    // 🟢 ADD
        if (action === "add") {

        const cursoExiste = prev.find(curso => curso.id === id)

        // si el curso NO existe → lo agregamos
        if (!cursoExiste) {
            return prev.concat({
            id: id,
            horarioId: horario !== null ? [horario] : []
            })
        }

        // si existe y hay horario → agregar horario
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

        if(action === "addAll") {
            const cursoExiste = prev.find(curso => curso.id === id)

            // si el curso NO existe → lo agregamos
            if (!cursoExiste) {
                return prev.concat({
                id: id,
                horarioId: horario !== null ? [horario] : []
                })
            }

            // si existe y hay horario → setear todos lo horarios del array que llega
            if (horario !== null) {
                return prev.map(curso => {
                if (curso.id !== id) return curso
                

                const horarios = horario

                return {
                    ...curso,
                    horarioId: horarios
                }
                })
            }
        }

        if (action === "removeAll") {
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

    const [events, setEvents] = useState([])
    
    const handleButtonGeneraComb = () => {
        const combinaciones = generarCombinaciones(selectInfo)
        console.log("combinaciones", combinaciones)
        setEvents(combinaciones)
        setStep(2)
    }


    return(
        <div className="min-h-0 flex flex-col items-center px-4 pb-2 w-full relative">
            <Steps step={step} setStep={setStep} /> 
            {step === 0 && <><SelectCourses cursos={cursos} setCourse={setCourse} selectInfo={selectInfo} setStep={setStep}/> </>}
            {step === 1 && <SelectTeachers selectInfo={selectInfo} setCourse={setCourse} handleButtonGeneraComb={handleButtonGeneraComb} />}
            {step === 2 && <HorariosResults selectInfo={selectInfo} events={events} />} 
        </div>
    )
}   
export default Index;