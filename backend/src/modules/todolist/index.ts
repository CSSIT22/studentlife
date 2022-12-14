import express from "express"
import createTask from "./routes/createtask"
import listTask from "./routes/listtask"
import listFolder from "./routes/listfolder"
import detailTask from "./routes/detail"
import editTask from "./routes/editTask"

// import createTask from "./routes/createTask"

const todolistRoutes = express()
todolistRoutes.use(express.json())

// todolistRoutes.post("/createTask",createTask)
// todolistRoutes.delete("/deleteTask", deleteTask)
// todolistRoutes.get("/editTask", editTask)
todolistRoutes.get("/listtask", listTask)
todolistRoutes.get("/listfolder", listFolder)
todolistRoutes.post("/createtask", createTask)

todolistRoutes.post("/detail", detailTask)
todolistRoutes.post("/editTask", editTask)

export default todolistRoutes
