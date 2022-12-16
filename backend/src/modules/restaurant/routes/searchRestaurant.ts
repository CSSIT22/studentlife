import { Request, Response } from "express"
import { Restaurant } from "@apiType/restaurant"

const searchRestaurant = async (req: Request, res: Response) => {
    const name = req.query.name + ""
    var d = new Date()
    var dayNo = d.getDay()
    try {
        const prisma = res.prisma
        const search = await prisma.restaurant.findMany({
            where: {
                resName: { contains: name, mode: "insensitive" },
            },
            include: {
                detail: true,
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
                images: true,
            },
        })

        res.send(search)
    } catch (error) {
        console.log("Search error")
    }

    // getRestaurant().forEach((res) => {
    //     if (res.resName.substring(0, name.length).toLowerCase() == name.substring(0, name.length).toLowerCase()) {
    //         searchRes.push(res)
    //     }
    // })
}
export default searchRestaurant
