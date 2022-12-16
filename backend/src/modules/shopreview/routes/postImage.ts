import { Request, Response } from "express"

const postimage = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId
        const postimage: any = {
            //ให้ไปทำงานที่ sre_re ก่อน เอาไอดีมาก่่อน
            userId: user,
            

        }
        const rev = await prisma.sReview_Review_Image.create({
            data: {
                ...postimage,
            },
        })
        res.send(rev)
    } catch (err) {
        console.log(err)
        res.status(400).send("some error")
    }
    // console.log(req.body)
}
export default postimage
