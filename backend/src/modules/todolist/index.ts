import express from "express"
import createTask from "./routes/createtask"
import listTask from "./routes/listtask"

const todolistRoutes = express()
todolistRoutes.use(express.json())

todolistRoutes.put("/createtask", createTask)
todolistRoutes.get("/listtask", listTask)

export default todolistRoutes
