import { group } from "console"
import express from "express"

const groupRoutes = express()
groupRoutes.use(express.json())

groupRoutes.get("/Hello", (req, res) => {
    res.send("Hello")
})



groupRoutes.get("/search/:id", (req, res) => {
    const id = req.params.id
    let select: any | null = null

    // boy.forEach((boy) => {
    //     if (boy.id == id) {
    //         select = boy
    //     }
    // })
    // if (select != null) {
    //     return res.send(select)
    // }
    // return res.status(404).send("boy not found")
    res.send(boy)
})

groupRoutes.post("/editpeople", (req, res) => {
    const name = req.body.name
    const id = req.body.id

    const updateData = boy.map((boy) => {
        if (boy.id == id) {
            return { name: name, id: id }
        }
        return boy
    })
    boy = updateData
    console.log(updateData)
    res.send("edit done")
})

export default groupRoutes
