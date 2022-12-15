import { Request, Response } from "express"

const postmyreview = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        // const user = useContext(authContext)
        const user = req.user?.userId
        //console.log(req)
        const postmyreview: any = {
            //ให้ไปทำงานที่ sre_re ก่อน เอาไอดีมาก่่อน
            // reviewId: req.body.reviewId,
            shopId: req.body.shopId + "",
            // resId: req.body.resId || null,
            userId: user,
            text: req.body.text,
            rating: 5,
            likeReceived: 0,
        }
        const rev = await prisma.sReview_Review.create({
            data: {
                ...postmyreview,
            },
        })
        res.send(rev)
    } catch (err) {
        console.log(err)
        res.send("some error")
    }
    console.log(req.body)
}
export default postmyreview
