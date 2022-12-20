import { Request, Response } from "express"

const communityTest = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const body = req.body

    try {
        // const tag2id = await prisma.tag.findMany({
        //     select: {
        //         tagId: true,
        //     },
        //     where: {
        //         tagId: {
        //             in: body.communityTag,
        //         },
        //     },
        // })

        // let a: any = []

        // let x: any = {
        //     any: tag2id.map((item) => a.push({ tagid: item.tagId, communityId: body.communityId })),
        // }


        // const communityUser = await prisma.community_User.findMany({
        //     where: {
        //         userId: body.user,
        //         status: true,
        //     },
        // })

        // const suggestions = await prisma.community.findMany({
        //     where: {
        //         communityId: { notIn: communityUser.map((item: any) => item.communityId) },
        //         NOT:{communityOwnerId: body.user}
        //     },
        // })



        // const communityById = await prisma.community.findUnique({
        //     where: {
        //         communityId: body.communityId,
        //     },
        //     include: {
        //         tags: true,
        //     },
        // })


        // const tags = await prisma.community_Tag.findMany({
        //     select:{tagId:true},
        //     where:{communityId:body.id}
        // })

        // let tagIn:any = []

        // let x: any = {
        //     any: tags.map((item) => tagIn.push(item.tagId)),
        // }





        // let b : any = []
        // let y: any = {
        //     any: tags.map((item) => a.push({tagId:item.tagId,tagName:item.tagName.trim(),tagDesc:item.tagDesc , isSelected: false })),
        // }

        // await prisma.community.update({
        //     where: {
        //         communityId: body.communityId,
        //     },
        //     data: {communityName:body.communityName}
            
        // })

        
        const Member = await prisma.community_User.findMany({
            where:{
                userId: body.user,
                communityId: body.communtiy
            }
        })

        const isMember = Member.length == 0 ?  false : true


        const owner = await prisma.community.findMany({
            where:{
                communityOwnerId : body.user,
                communityId: body.communtiy
            }
        })
        const isOwner = (owner.length == 0) ?  false : true

        const hello = {isOwner}
        res.send(hello)
        
    } catch (err) {
        console.log(err)
        res.status(403)
    }
}

export default communityTest
