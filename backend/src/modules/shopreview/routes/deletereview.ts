import { prisma } from "@prisma/client"
import { Request, Response } from "express"

const deletereview = async (req: Request<any>, res: Response<any>) => {
    try {
        const prisma = res.prisma
        const user = req.user?.userId


        //files
        await prisma.sReview_Review_File.deleteMany({   
            where:{
                reviewId:req.body.fileId 
            }
        })
      
        //comments
        await prisma.sReview_Comment.deleteMany({   
            where:{
              commentId:req.body.commentId 

            }  ,
            
        })
       
        //likes
        await prisma.sReview_Review_Like.deleteMany({   
            where:{
                reviewId:req.body.reviewId
            }
        })
      
        const sn = await prisma.sReview_Review.delete({
            where: {
              reviewId: req.body.reviewId,
            },
        })
        res.send(sn)
        
    } catch (err) {
        console.log(err)
        console.log("have some error on this delete comment")
        return res.send("have some error on this delete comment")
    }
}

export default deletereview
