import express from "express"
import createTask from "./routes/createtask"

const todolistRoutes = express()
todolistRoutes.use(express.json())

todolistRoutes.put("/createtask", (req, res) => {
    const taskName = req.body.taskName
    const taskId = req.body.taskId
    const taskUserId = req.body.user
    const taskDesc = req.body.taskDesc
    const created = req.body.created
    const due = req.body.due
    const taskType = req.body.taskType

    res.send({
        success: true,
        name: taskName,
        id: taskId,
        taskUserId: taskUserId,
        taskDesc: taskDesc,
        created: created,
        due: due,
        taskType: taskType,
    })
})

export default todolistRoutes
