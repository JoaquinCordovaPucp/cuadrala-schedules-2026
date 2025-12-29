import Calendar from "./Calendar"
import { useEffect, useState } from "react"
import { generarCombinaciones } from "../data/functions"

export default function CalendarNInputs ({ cursos }) {

    const [events, setEvents] = useState([])
    
    const [selectInfo, setSelectInfo] = useState([
        {
            id: "none",
            horarioId: [0]
        }, 
        {
            id: "none",
            horarioId: [0]
        }, 
        {
            id: "none",
            horarioId: [0]
        }, 
        {
            id: "none",
            horarioId: [0]
        }, 
        {
            id: "none",
            horarioId: [0]
        }, 
        {
            id: "none",
            horarioId: [0]
        }, 
    ])

    const handleButton = () => {
        const combinaciones = generarCombinaciones(selectInfo)
        console.log("combinaciones", combinaciones)
        setEvents(combinaciones)
    }
    const getHorarios = (cursoId) => {
        const curso = cursos.find(curso => {
            return curso.id == cursoId
        })
        console.log("curso", curso)

        const horarios = curso.horarios.map(horario => {
            return horario.horarioId
        })
        return horarios
    }

    const horarios = getHorarios("CDR121")
    console.log("horarios", horarios)

    const handleChangeSelectCourse = (e, index) => {
        const value = e.target.value
        setSelectInfo(prev =>
            prev.map((item, i) =>
            i === index
                ? { id: value, horarioId: [0]}
                : item
            )
        )
    }
    
    const handleChangeSelectHorario = (e, idCurso) => {
        const value = parseInt(e.target.value)
        setSelectInfo(prev => 
            prev.map((cursoSelec) => {
                if(cursoSelec.id === idCurso) {
                    if(cursoSelec.horarioId.includes(value)) {
                        return {...cursoSelec, horarioId: cursoSelec.horarioId.filter(horario => horario != value && (horario != 0) )}
                    } else {
                        return {...cursoSelec, horarioId: [...cursoSelec.horarioId,  value ].filter(horario => horario != 0)}
                    }
                } else {
                    return cursoSelec
                }//me quede aca, explota cuando le doy a un checbox, probablemente actualizo mal el estado
        })
        )
    }

    return(
        <>
            <h2 className="">Ingrese Su curso</h2>
            {selectInfo.map((selecCurso, index) => {
                return(
                    <>
                    <select value={selecCurso.id} onChange={(e) => handleChangeSelectCourse(e, index)} >
                        <option value="none">none</option>
                        {cursos.map((curso, index2) => {
                            return(
                                <>
                                <option value={curso.id} key={index2}>{curso.id}</option>
                                </>
                            )
                            })}
                    </select>
                    {selecCurso.id != "none" && 
                        getHorarios(selecCurso.id).map((horario) => {
                                //este explota
                            return(<label><input checked={selecCurso.horarioId.includes(horario)} type="checkbox" onChange={(e) => handleChangeSelectHorario(e, selecCurso.id)} value={horario}/>{horario}</label>)
                    })
                    }
                    </>
                )
            })}
            <button onClick={handleButton}>
                Calcular Horarios
            </button>
            <Calendar events={events} />
        </>
    )
}