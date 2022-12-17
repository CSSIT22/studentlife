
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
            if(err){
                console.log("file not found")
            }
        })
    }catch(err){
        console.log(err);
        
    }

}
export default getFile
