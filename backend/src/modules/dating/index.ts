import express from "express"
import createAPollRoutes from "./routes/create"
import interestsRoutes from "./routes/interests"
import optionRoutes from "./routes/option"
import readDBRoutes from "./routes/readDB"
import resetDBRoutes from "./routes/resetDB"

const datingRoutes = express()

datingRoutes.use(express.json())

datingRoutes.get("/", (_, res) => {
    return res.send("Dating Module API")
})

datingRoutes.use("/interests", interestsRoutes)
datingRoutes.use("/option", optionRoutes)
datingRoutes.use("/create", createAPollRoutes)

// Danger zone
datingRoutes.use("/readDB", readDBRoutes)
datingRoutes.use("/resetDB", resetDBRoutes)

export default datingRoutes
