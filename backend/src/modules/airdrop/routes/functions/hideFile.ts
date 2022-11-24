const hideFile = async (req: Request | any, res: Response | any) => {
    const { fileId } = req.body
    const { prisma } = res
    // console.log(req.body);
    const payload: any = {
        userId: req.user?.userId,
        fileId: fileId,
    }
    const hide = await prisma.user_Show_File.create({
        data: payload,
    })
    res.json("hide file sucessful")
}
export default hideFile
