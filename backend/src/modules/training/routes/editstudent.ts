import { Request, Response } from "express"
import { getStudent, setStudent, students } from ".."
import { Student } from "@apiType/training"

const editedStudent = (req: Request, res: Response) => {
    const name = req.body.name
    const id = req.body.id
    let editedStudent: Student | null = null
    const newdata = getStudent().map((student) => {
        if (student.id == id) {
            editedStudent = { id: id, name: name }
            return { id: id, name: name }
        }
        return student
    })
    setStudent(newdata)
    // students = newdata
    res.send(editedStudent)
}

export default editedStudent
