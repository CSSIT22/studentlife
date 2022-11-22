const path = require("path")
const axios = require("axios")
import { Blob } from "buffer"
const downloadFile = async (req: Request | any, res: Response | any) => {
    const { prisma } = res
    const user = await req.user?.userId
    const fileID = req.params.fileid
    const getFileFromService = await axios.get(`https://drive.modlifes.me/${fileID}`, {
        headers: {
            Authorization: "Bearer GjkhtiJ12!",
        },
    })

    let file = new Blob(getFileFromService.data)

    const payload: any = {
        fileId: fileID,
        userId: user,
        historyType: "DOWNLOAD",
        createdAt: new Date(Date.now() + 60 * 60 * 1000),
    }
    //save into history
    try {
        const downloadHis = await prisma.file_History.create({
            data: payload,
        })
    } catch (err) {
        console.log(err)
    }
    res.type(file.type)
    file.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf))
    })
}
export default downloadFile
