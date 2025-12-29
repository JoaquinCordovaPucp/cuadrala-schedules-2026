import SearchBar from "./SearchBar.jsx";
import CourseCard from "./CourseCard.jsx";
import { useState } from "react";
import NextButton from "./NextButton.jsx";


export default function SelectCourses({cursos, setCourse, selectInfo}) {
    const [searchQuery, setSearchQuery] = useState("")
    const filteredCursos = cursos.filter(curso =>
        curso.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return(
        <div className="w-full h-auto bg-[#F8F7FC] rounded-lg shadow-[0_2px_100px_rgba(0,0,0,0.25)] px-2.5 gap-2 flex flex-col py-4 mb-6">
            <NextButton />
            <h2 className="text-2xl font-bold mb-3">Selecciona tus cursos</h2>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className="max-h-3/5 overflow-y-auto gap-2 flex flex-col pb-2">
                {filteredCursos.map(curso => {
                    const datos = {
                        nombre: curso.title,
                        id: curso.id,
                        profesores: curso.horarios.length,
                        creditos: curso.creditos
                    }

                    return (
                        <CourseCard
                        key={curso.id}
                        datos={datos}
                        setCourseId={setCourse}
                        isChecked={selectInfo.some(c => c.id === curso.id)}
                        />
                    )
                })}
            </div>
        </div>
    )
}