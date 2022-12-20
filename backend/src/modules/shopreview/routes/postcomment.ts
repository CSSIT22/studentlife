import { Request, Response } from "express"

const postcomment = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        // const user = useContext(authContext)
        const user = req.user?.userId

        const postcomment: any = {
            reviewId: req.body.reviewId,
            userId: user,
            text: req.body.text,
            likeReceived: 0,
        }
        console.log(user)

        const rev = await prisma.sReview_Comment.create({
            data: {
                ...postcomment,
            },
        })
        res.send(rev)
    } catch (err) {
        console.log(err)
        res.status(400).send("some error")
    }
    // console.log(req.body)
}
export default postcomment
