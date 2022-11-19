import express from "express"
import interestsRoutes from "./routes/interests"

const datingRoutes = express()

datingRoutes.use(express.json())

datingRoutes.get("/", (_, res) => {
    return res.send("Dating Module API")
})

// Interest page's routes
datingRoutes.use("/interests", interestsRoutes)

export default datingRoutes
