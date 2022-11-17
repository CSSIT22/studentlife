import express, { Request, Response } from "express"
import fileRoutes from "./routes/fileRoutes"
import userRoutes from "./routes/userRoutes"
const airdropRoutes = express()

airdropRoutes.get("/", (req: Request, res: Response) => {
    res.send("Welcome to airdrop API")
    console.log(req.user)
})
airdropRoutes.use("/file", fileRoutes)
airdropRoutes.use("/user", userRoutes)

export default airdropRoutes
