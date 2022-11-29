import { Request, Response } from "express"
import { prisma } from "@prisma/client"
import axios from "axios"

const drive = axios.create({
    baseURL: "https://drive.modlifes.me",
    headers: {
        Authorization: "Bearer GjkhtiJ12!",
    },
})

const getEachFile = async (req: Request<any>, res: Response<any>) => {
    try {
        const file = await axios
            .get(`https://drive.modlifes.me/${req.body.fileId}`, {
                headers: {
                    Authorization: "Bearer GjkhtiJ12!",
                },
                responseType: "arraybuffer",
            })
            .then((res: any) => {
                console.log(res.data)
                if (res.data == "record not found") {
                    res.send("No file")
                } else {
                    res.send(res)
                }
            })

        // res.header("Content-Type", (await file).headers["content-type"])
        // res.send((await file).data)
    } catch (err) {
        console.log(err)
    }
}
export default getEachFile
