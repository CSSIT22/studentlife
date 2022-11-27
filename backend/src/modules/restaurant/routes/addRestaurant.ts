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
                resName: "Ping House",
                lastupdated: new Date("2022-04-06 10:00:00"),
                likes: 442,
                isSeen: false,
                detail: {
                    create: {
                        
                        phoneNo: "0948421111",
                        website: "https://www.google.co.th",
                        location:
                            "https://www.google.co.th/maps/place/Kitchen+Chef's/@13.6507247,100.4952625,17z/data=!3m1!4b1!4m5!3m4!1s0x30e2a354aad8ebf5:0x479bb05defc2e495!8m2!3d13.6507195!4d100.4974512",
                        vicinity: "opposite KMUTT",
                        latitude: 13.652144605858041, 
                        longitude: 100.4886319313759,
                        zone: "หลังมอ"
                    },
                },
                closeAt: {
                    createMany: {
                        data: [
                            { close: "21.00", day: 1 },
                            { close: "21.00", day: 2 },
                            { close: "21.00", day: 3 },
                            { close: "21.00", day: 4 },
                            { close: "21.00", day: 5 },
                            { close: "21.00", day: 6 },
                            { close: "21.00", day: 7 },
                        ],
                    },
                },
                openAt: {
                    createMany: {
                        data: [
                            { open: "06.00", day: 1 },
                            { open: "06.00", day: 2 },
                            { open: "06.00", day: 3 },
                            { open: "06.00", day: 4 },
                            { open: "06.00", day: 5 },
                            { open: "06.00", day: 6 },
                            { open: "06.00", day: 7 },
                        ],
                    },
                },
                images: {
                    createMany: {
                        data: [
                            {
                                image:  "https://www.emporium.co.th/wp-content/uploads/2017/10/e9f427fe626ffb761c16dbdf3e5475c1-1024x683.jpg",
                               
                             
                            },
                            {
                                image:      "https://mustsharenews.com/wp-content/uploads/2022/09/starbucks-singapore-data-breach.jpg",
                                
                                
                            },
                            {
                                image:"https://www.amarinplaza.com/storage/upload/store/gallery/klN9x7ZpVSKl6Wjkmae5qtKOp3uYKeiktnlfiO3l.jpeg",
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
