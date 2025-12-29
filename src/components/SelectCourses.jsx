import SearchBar from "./SearchBar.jsx";
import CourseCard from "./CourseCard.jsx";
import { useState } from "react";
import { Button } from "./ui/button.js";
import AdMobile from "./AdMobile.jsx";


export default function SelectCourses({cursos, setCourse, selectInfo, setStep}) {
    const [searchQuery, setSearchQuery] = useState("")
    const filteredCursos = cursos.filter(curso =>
        curso.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return(
        <div className="w-full overflow-y-auto bg-[#F8F7FC] rounded-lg shadow-[0_2px_100px_rgba(0,0,0,0.25)] px-2.5 gap-2 flex flex-col py-4 mb-2">
            <h2 className="text-2xl font-bold mb-2">Selecciona tus cursos</h2>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className="min-h-0 overflow-y-auto gap-2 flex flex-col pb-2">
                {filteredCursos.map((curso, i) => {
                    const datos = {
                        nombre: curso.title,
                        id: curso.id,
                        profesores: curso.horarios.length,
                        creditos: curso.creditos
                    }

                    return (
                        <>
                        <CourseCard
                        key={curso.id}
                        datos={datos}
                        setCourseId={setCourse}
                        isChecked={selectInfo.some(c => c.id === curso.id)}
                        />
                        {i % 4 === 3 && <AdMobile />}
                        </>
                    )
                })}
            </div>
            <Button disabled={!selectInfo.length} onClick={() => {setStep(1)}} size="lg" variant="outline">
                Siguiente
            </Button>
        </div>
    )
}