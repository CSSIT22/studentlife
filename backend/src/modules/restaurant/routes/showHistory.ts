import { Restaurant } from "@apiType/restaurant"
import { Request, Response } from "express"
import { getRestaurant, restaurant } from ".."
import { prisma } from "@prisma/client"

const showHistory = async (req: Request, res: Response) => {
    const user = req.user?.userId || ""
    const id = req.params.id

    try {
        const prisma = res.prisma

        const hist = await prisma.restaurant_Like_By_User.findMany({
            include: {
                restaurant: {
                    include: {
                        images: {
                            select: {
                                image: true,
                            },
                        },
                    },
                },
            },
            where: {
                userId: user,
            },
        })

        //     const prisma = res.prisma
        //     const resSeen = await prisma.restaurant.findMany({
        //         select: { resName: true, isSeen: true, images: true },
        //         where: { isSeen: true },
        //     })

        //     const hist = await prisma.restaurant_Seen_By_User.findMany({
        //     where: {
        //         userId: user,
        //         // resId: { in: resSeen.map((item: any) => item.resId) },
        //     },
        //     include: {
        //         restaurant: {
        //             include: {
        //                 images: true,
        //             },
        //         },
        //     },
        // })

        //console.log(hist)

        res.send(hist)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}
export default showHistory

// const userid = parseInt(req.query.userid+"")
// let showHist: Restaurant[] = []
// getRestaurant().forEach((res)=> {
//      if(res.userid == userid){
//          showHist.push(res)
//      }
// })
// res.send(showHist)

// const user = req.params.user
// try{
//     const prisma = res.prisma
//     const hist = await prisma.restaurant_Seen_By_User.findMany({
//         where: {
//             userId: user,
//             restaurant: {
//                 isSeen: true
//             }
//         },

//     })

//     res.send(hist)
// } catch (err){

// }

// const resSeen = await prisma.restaurant.findMany({
//     select: { resName: true, isSeen: true, images: true },
//     where: { isSeen: true },
// })
// const hist = await prisma.restaurant_Seen_By_User.findMany({
//     where: {
//         userId: user,
//         resId: { in: resSeen.map((item: any) => item.resId) },
//     },
//     include: {
//         restaurant: {
//             include: {
//                 images: true,
//             },
//         },
//     },
// })

// try {
//     const prisma = res.prisma
//     const hist = await prisma.restaurant.findMany({
//         where: {
//             isSeen: true,
//         },
//         include: {
//             userSeen: {
//                 select: {
//                     userId: true,
//                     seenAt:true,
//                 },
//             },
//             images: {
//                 select: {
//                     image: true,
//                 },
//             },
//         },
//     })

//     res.send(hist)
