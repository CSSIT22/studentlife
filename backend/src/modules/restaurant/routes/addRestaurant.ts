import { Request, Response } from "express"

const addRestaurant = async (req: Request, res: Response) => {
    const id = req.params.id
    console.log("test")
    try {
        console.log("test")
        const prisma = res.prisma
        const rest = await prisma.restaurant.create({
            data: {
                resId: id,
                resName: "Tenjo",
                lastupdated: new Date("2022-04-06 10:00:00"),
                likes:  95,
                detail: {
                    create: {
                        phoneNo: "0948421111",
                        website: "https://www.google.co.th",
                        location:
                            "https://www.facebook.com/bearhousethailand/",
                        vicinity: "opposite KMUTT",
                        latitude: 13.652453925756781,
                        longitude: 100.48673783051156,
                        zone: "หลังมอ",
                    },
                },
                closeAt: {
                    createMany: {
                        data: [
                            { close: "22.00", day: 0 },
                            { close: "22.00", day: 1 },
                            { close: "22.00", day: 2 },
                            { close: "22.00", day: 3 },
                            { close: "22.00", day: 4 },
                            { close: "22.00", day: 5 },
                            { close: "22.00", day: 6 },
                        ],
                    },
                },
                openAt: {
                    createMany: {
                        data: [
                            { open: "06.00", day: 0 },
                            { open: "06.00", day: 1 },
                            { open: "06.00", day: 2 },
                            { open: "06.00", day: 3 },
                            { open: "06.00", day: 4 },
                            { open: "06.00", day: 5 },
                            { open: "06.00", day: 6 },
                        ],
                    },
                },
                images: {
                    createMany: {
                        data: [
                            {
                                image:  "https://res.klook.com/image/upload/activities/rtihxwt41d76gj2tincn.jpg",
                            
                               
                            },
                            {
                                image:   "https://partyspacedesign.com/wp-content/uploads/2020/03/PSD20Bearhouse_05.jpg",

                            },
                            {
                                image:   "https://www.bkkmenu.com/files/2019/06/IMG_0441.jpg",
                                
                            },
                        ],
                    },
                },
            },
        })
        res.send(rest)
    } catch (err) {
        console.log("Error")
    }
}

export default addRestaurant
