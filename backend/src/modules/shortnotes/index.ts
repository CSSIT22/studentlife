import express from "express"
const shortnotesRoutes = express()

shortnotesRoutes.get("/getShortnotes", (req, res) => {
    res.send("data")
})

export default shortnotesRoutes
