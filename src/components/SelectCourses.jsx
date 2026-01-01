import SearchBar from "./SearchBar.jsx";
import CourseCard from "./CourseCard.jsx";
import { useState } from "react";
import { Button } from "./ui/button.js";
import AdMobile from "./AdMobile.jsx";
import React from "react";

export default function SelectCourses({cursos, setCourse, selectInfo, setStep}) {
    
    const [searchQuery, setSearchQuery] = useState("");
    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    }
    const filteredCursos = cursos.filter(curso =>
        normalizeText(curso.title).includes(
            normalizeText(searchQuery)
        )
    )
    return(
        <div className="w-full min-h-0 bg-[#F8F7FC] rounded-lg shadow-[0_2px_100px_rgba(0,0,0,0.25)] px-2.5 gap-2 flex flex-col py-3 mb-2">
            <h2 className="text-2xl font-bold mb-2">Selecciona tus cursos</h2>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className="min-h-0 overflow-y-auto gap-2 flex flex-col pb-2">
                {filteredCursos.map((curso, i) => {
                    return (
                        <React.Fragment key={curso.id}>
                            <CourseCard
                                curso={curso}
                                setCourseId={setCourse}
                                isChecked={selectInfo.some(c => c.id === curso.id)}
                            />
                            {i % 4 === 3 && <AdMobile />}
                        </React.Fragment>
                    )
                })}
            </div>
            <Button disabled={!selectInfo.length} onClick={() => {setStep(1)}} size="lg" variant="outline">
                Siguiente
            </Button>
        </div>
    )
}