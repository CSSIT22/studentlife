import e, { Request, Response } from "express"

const getRoom = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const prisma = res.prisma
        if(user == null){
            res.status(202).send("ยังไม่ login เลยคั้บพี่ชาย")
        }
        const room_individual = await prisma.user_To_Room.findMany({
           select:{
            room:{
                select:{
                    nick:{
                        select:{
                            anotherUserId:true,
                            userId:true,
                            nickname:true,
                            nameWho:{
                                select:{
                                    image:true
                                }
                            }
                        },where:{
                            userId : user
                        }
                    },chatColor:true , roomType:true,roomId:true
                }
            }
           },where:{
            userId:user,room:{
                roomType:"INDIVIDUAL"
            }
           }
        })
        const room_group = await prisma.user_To_Room.findMany({
            select:{
             room:{
                select:{
                    group:{
                        select:{
                            roomName:true
                        }
                    },roomType:true,roomId:true,chatColor:true
                }
             }
            },where:{
             userId:user,room:{
                 roomType:"GROUP"
             }
            }
         })
        res.send([...room_individual,...room_group])
    } catch {
        res.status(400).send("Error can't find room")
    }
}
export default getRoom
