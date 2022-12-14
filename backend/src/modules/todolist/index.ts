import express from "express"
import createTask from "./routes/createtask"
import listTask from "./routes/listtask"
import listFolder from "./routes/listfolder"
// import createTask from "./routes/createTask"

const todolistRoutes = express()
todolistRoutes.use(express.json())

// todolistRoutes.post("/createTask",createTask)
// todolistRoutes.delete("/deleteTask", deleteTask)
// todolistRoutes.get("/editTask", editTask)
todolistRoutes.get("/listtask", listTask)
todolistRoutes.get("/listfolder", listFolder)

todolistRoutes.put("/createtask", createTask)

export default todolistRoutes
