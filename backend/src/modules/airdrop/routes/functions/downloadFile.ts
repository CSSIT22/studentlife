const path = require("path")
const downloadFile = async(req: Request | any, res: Response | any) => {
    const {prisma} = res
    const user = await req.user?.userId;
    const arrFilename = req.params.filename.split('')
    const rfilename = arrFilename.slice(user?.length).join(''); //remove cuid
    const directoryPath = path.join(__dirname, "./../../files" + "/" + req.params.type.toLowerCase())
    //find file id

    const file = await prisma.file_Info.findFirstOrThrow({
        where:{
            fileName:rfilename,
        },
        select:{
            fileId:true,
        }
    })
    const payload:any = {
        fileId:file.fileId,
        userId:user,
        historyType:"DOWNLOAD",
        createdAt:new Date(Date.now() + 60 * 60 * 1000),
    }
    //save into history
    try{
        const downloadHis = await prisma.file_History.create({
            data:payload
        })
    }
    catch(err){
        console.log(err)
    }
    console.log(directoryPath)
    res.download(directoryPath+"/"+req.params.filename+"."+req.params.filename.split('.')[1])
}
export default downloadFile;