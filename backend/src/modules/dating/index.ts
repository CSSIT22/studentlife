import express from "express"
import createAPollRoutes from "./routes/create"
import interestsRoutes from "./routes/interests"
import optionRoutes from "./routes/option"
import readDBRoutes from "./routes/readDB"

const datingRoutes = express()

datingRoutes.use(express.json())

datingRoutes.get("/", (_, res) => {
    return res.send("Dating Module API")
})

datingRoutes.use("/interests", interestsRoutes)
datingRoutes.use("/option", optionRoutes)
datingRoutes.use("/create", createAPollRoutes)
datingRoutes.use("/readDB", readDBRoutes)

export default datingRoutes
