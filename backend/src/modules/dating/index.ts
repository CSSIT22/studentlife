import express from "express"
import createAPollRoutes from "./routes/create"
import interestsRoutes from "./routes/interests"
import optionRoutes from "./routes/option"

const datingRoutes = express()

datingRoutes.use(express.json())

datingRoutes.get("/", (_, res) => {
    return res.send("Dating Module API")
})

datingRoutes.use("/interests", interestsRoutes)
datingRoutes.use("/option", optionRoutes)
datingRoutes.use("/create", createAPollRoutes)

export default datingRoutes
