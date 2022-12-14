import express from "express"
import createTask from "./routes/createtask"
import listTask from "./routes/listtask"
import listFolder from "./routes/listfolder"
import detailTask from "./routes/detail"
import editTask from "./routes/editTask"
import finishTask from "./routes/finishtask"
import createFolder from "./routes/createfolder"
import deleteTask from "./routes/deleteTask"
import deleteFolder from "./routes/deletefolder"
import listTaskInFolder from "./routes/listtaskinfolder"

const todolistRoutes = express()
todolistRoutes.use(express.json())

// todolistRoutes.post("/createTask",createTask)
// todolistRoutes.delete("/deleteTask", deleteTask)
// todolistRoutes.get("/editTask", editTask)

todolistRoutes.post("/detail", detailTask)
todolistRoutes.post("/editTask", editTask)
todolistRoutes.post("/listtask", listTask)
todolistRoutes.post("/listfolder", listFolder)
todolistRoutes.post("/finishtask", finishTask)
todolistRoutes.post("/createfolder", createFolder)
todolistRoutes.post("/deletetask", deleteTask)
todolistRoutes.post("/createtask", createTask)
todolistRoutes.post("/deletefolder", deleteFolder)
todolistRoutes.post("/listtaskinfolder", listTaskInFolder)

export default todolistRoutes
