import { Express, Request, Response } from "express"
import { getObject, setObject } from "../index"
import { Notiobject } from "@apiType/notification"
const readNotiObject = async (req: Request, res: Response) => {
    try {
        let readObject = null
        if (req.params.module != "All") {
            const newData = getObject().map((el) => {
                if (el.isRead == false && el.module == req.params.module) {
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
        } else {
            const newData = getObject().map((el) => {
                if (el.isRead == false) {
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
        }
    } catch (err) {
        return res.status(400).send("error")
    }
}
export default readNotiObject
