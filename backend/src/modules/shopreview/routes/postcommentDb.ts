import { Request, Response } from "express"

const postcomment = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        // const user = useContext(authContext)
        const user = req.user?.userId
        //console.log(req)
        // const comment = req.body.type.map(item=>({item:}))
        const postcomment: any = {
            //ให้ไปทำงานที่ sre_re ก่อน เอาไอดีมาก่่อน
            commentId: "07",
            reviewId: "08",
            userId: user,
            text: req.body.text,

            likeRecieved: 0,
        }
        const rev = await prisma.sReview_Comment.create({
            data: postcomment,
        })
        res.send(rev)
    } catch (err) {
        console.log(err)
        res.status(400).send("some error")
    }
    // console.log(req.body)
}
export default postcomment
