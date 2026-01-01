
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import React from "react"

export default function CourseCard({curso, setCourseId, isChecked}) {
    const { id, title , creditos } = curso;
    const profesores = curso.horarios.length
    return(
        <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <Checkbox id={id} checked={isChecked} className="mt-0.5" onCheckedChange={(value) => {
                if(value === true) {
                    setCourseId(id, "add")
                } else if (value === false) {
                    setCourseId(id, "remove")
                }
            }}/> 
            <div className="flex-1">
                <label htmlFor={id} className="font-medium cursor-pointer flex flex-col sm:flex-row sm:items-center gap-1">
                    <span>{title}</span>
                    <Badge variant="outline" className="w-fit">
                        {id}
                    </Badge>
                </label>
                    <div className="mt-1.5 text-xs text-muted-foreground">
                        <span>
                            {creditos} créditos
                        </span>
                        <span className="mx-2">
                            •
                        </span>
                        <span>
                            {profesores} profesores disponibles
                        </span>
                    </div>
            </div>
        </div>
    )
}
