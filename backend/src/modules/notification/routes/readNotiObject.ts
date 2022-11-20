import { Express, Request, Response } from "express"
import { getObject, setObject } from "../index"

const readNotiObject = async (req: Request, res: Response) => {
    try {
        let readObject = null
        const newData = getObject().map((el) => {
            if (el.id == req.params.notiObjectId) {
                readObject = {
                    id: el.id,
                    date: el.date,
                    isRead: true,
                    module: el.module,
                    description: el.description,
                    link: el.link,
                    user: el.user,
                }
                return readObject
            }
            return el
        })
        setObject(newData)
        res.send(readObject)
    } catch (err) {
        return res.status(400).send("There is an error finding NotiObject")
    }
}
export default readNotiObject
