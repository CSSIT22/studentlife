import express from "express"
import { verifyUser } from "../backendService/middleware/verifyUser"
import editedStudent from "./routes/editstudent"
import searchStudent from "./routes/searchstudent"
import { Student } from "@apiType/training"

const trainingRoutes = express()

trainingRoutes.use(express.json())

export let students: Student[] = [
    { id: "1234", name: "tine" },
    { id: "2", name: "tine2" },
    { id: "3", name: "tine3" },
    { id: "4", name: "tine4" },
]

export const getStudent = () => students

export const setStudent = (newData: Student[]) => {
    students = newData
}

trainingRoutes.get("/getstudents", (req, res) => {
    res.send(students)
})

trainingRoutes.get("/searchstudent/:id", searchStudent)

trainingRoutes.post("/editstudent", verifyUser, editedStudent)

export default trainingRoutes
