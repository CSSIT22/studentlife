import { Request, Response } from "express"
import { getStudent, students } from ".."
import { Student } from "@apiType/training"

const searchStudent = (req: Request, res: Response) => {
    const id = req.params.id
    let selectedstudent: Student | null = null
    getStudent().forEach((student) => {
        if (student.id == id) {
            selectedstudent = student
        }
    })
    if (selectedstudent != null) {
        return res.send(selectedstudent)
    }
    return res.status(404).send("Student not found")
}

export default searchStudent
