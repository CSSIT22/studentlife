import { NextFunction, Response, Request } from "express"
import { fetchUser } from "./fetchUser"

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        return fetchUser(req, res, next)
    }
    return res.status(401).send("Unauthorized")
}
