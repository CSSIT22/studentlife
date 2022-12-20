
const axios = require("axios")
const getFile = async (req: Request | any, res: Response | any) => {
    const { prisma } = res
    const user = await req.user?.userId
    const fileID = req.params.fileid
    //forward file to front
    try{
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
        }).catch((err:any)=>{
        })
    }catch(err){        
    }

}
export default getFile
