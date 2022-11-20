const commentFile =  async (req: Request | any, res: Response | any) => {
    const { prisma } = res

    try{
        const comment = await prisma.file_Comment.create({
            data:{
                fileId:req.body.fileId,
                userId:req.user?.userId,
                commentText:req.body.commentTxt,
            }
        })
        res.status(200).json({message:"Comment successfully"})
    }catch(err){

    }
}
export default commentFile;