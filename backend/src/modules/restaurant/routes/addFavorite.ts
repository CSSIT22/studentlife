import { Request, Response } from "express"

const addFavorite = async (req: Request, res: Response) => {
    const resId = req.params.id
    const userId = req.user?.userId || ""
    try {
        const prisma = res.prisma
        const addUserFav = await prisma.restaurant_Favorite_By_User.create({
            data: { resId: resId, userId: userId },
        })
        res.send(addUserFav)
    } catch (error) {}
    //  let addResToFavor: Restaurant | null = null
    //  const newdata = getRestaurant().map((restaurant) => {
    //     if (restaurant.id == id) {
    //         restaurant.isFavorite = true
    //         addResToFavor = restaurant
    //         console.log(addResToFavor);

    //     }
    //     return restaurant
    // })
    // setRestaurant(newdata)
    // res.send(addResToFavor)
}

export default addFavorite
