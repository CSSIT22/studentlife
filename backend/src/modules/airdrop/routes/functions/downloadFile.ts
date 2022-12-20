const axios = require("axios")
const downloadFile = async (req: Request | any, res: Response | any) => {
    const { prisma } = res
    const user = await req.user?.userId
    const fileID = req.params.fileid
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
    //forward file to front
    const getFileFromService = await axios
        .get(`https://drive.modlifes.me/${fileID}`, {
            headers: {
                Authorization: "Bearer GjkhtiJ12!",
            },
            responseType: "arraybuffer",
        })
        .then((fileRes: any) => {
            const file = fileRes.data
            res.header("Content-Type", fileRes.headers["content-type"])
            res.send(file)
        }).catch((err: any) => {
            console.log(err)
        })
}
export default downloadFile
