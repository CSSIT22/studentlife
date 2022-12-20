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
        const fileID = req.params.id
        const file = await axios
            .get("https://drive.modlifes.me/" + fileID.trim(), {
                headers: {
                    Authorization: "Bearer GjkhtiJ12!",
                },
                responseType: "arraybuffer",
            })
            .then((fileRes: any) => {
                //let json = JSON.stringify(fileRes.data)
                if (fileRes.data == "record not found") {
                    fileRes.send("No file")
                } else {
                    const file = fileRes.data
                    res.header("Content-Type", fileRes.headers["content-type"])
                    res.send(file)
                }
            }).catch((err) =>{
                res.send(err)
            })

        // res.header("Content-Type", (await file).headers["content-type"])
        // res.send((await file).data)
    } catch (err) {
        console.log(err)
    }
}
export default getEachFile
