import SearchBar from "../SearchBar.jsx";
import CourseCard from "../CourseCard.jsx";
import { useState } from "react";
import { Button } from "../ui/button.js";
import AdMobile from "../AdMobile.jsx";
import React from "react";
import MainComponentLayout from "./MainComponentLayout.jsx";

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
        <MainComponentLayout>
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
        </MainComponentLayout>
    )
}