import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"
import { getRestaurant } from ".."

const showFavorite = async (req: Request, res: Response) => {
    // const userid = parseInt(req.query.userid+"")
    // let isFavorite: Restaurant[] = []
    // getRestaurant().forEach((res) => {
    //     if (res.userid == userid) {
    //         if(res.isFavorite == true){
    //             isFavorite.push(res)
    //         }
    //     }
    // })
    // res.send(isFavorite)

    const user = req.user?.userId || ""
    var d = new Date()
    var dayNo = d.getDay()
    try {
        const prisma = res.prisma
        const fav = await prisma.restaurant_Favorite_By_User.findMany({
            where: {
                userId: user,
            },
            select: {
                restaurant: {
                    include: {
                        detail: true,
                        images: true,
                        closeAt: {
                            where: {
                                day: dayNo,
                            },
                        },
                        openAt: {
                            where: {
                                day: dayNo,
                            },
                        },
                    },
                },
            },
        })

        res.send(fav)
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}
export default showFavorite
