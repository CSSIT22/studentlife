import express from "express"
import getAllInterests from "./routes/getAllInterests"

const datingRoutes = express()

datingRoutes.use(express.json())

datingRoutes.get("/", (_, res) => {
    return res.send("Dating Module API")
})

datingRoutes.get("/getAllInterests", getAllInterests)

export default datingRoutes
