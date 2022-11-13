import { Request, Response } from "express"
import express from "express"
import { verifyUser } from "./middleware/verifyUser"

const backendserviceRoutes = express()

backendserviceRoutes.get("/tokens", verifyUser, (req: Request, res: Response) => {
    res.send("This route send user's tokens info")
})
export default backendserviceRoutes
