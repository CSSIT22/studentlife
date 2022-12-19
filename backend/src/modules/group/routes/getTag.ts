import { Request, Response } from "express"

const getTag = async (req: Request, res: Response) => {
    const prisma = res.prisma
    const target = req.body.communityName

    try {

        const tags = await prisma.tag.findMany({})
        let a : any = []
        let x: any = {
            any: tags.map((item) => a.push({tagId:item.tagId,tagName:item.tagName.trim(),tagDesc:item.tagDesc , isSelected: false })),
        }
        




        res.send(a)
    } catch (err) {
        console.log(err)
        res.status(404)
    }
}

export default getTag
