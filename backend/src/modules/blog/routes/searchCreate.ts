// import { Request, Response } from "express"

// const searchCreate = async (req: Request, res: Response) => {
//     const prisma = res.prisma

//     try {
//         const post = await prisma.student_Post.findFirstOrThrow({ where: { userId: req.params.userId }, include: { postOwner: true } })
//         return res.send(post)
//     } catch (error) {
//         return res.status(404).send("Create page has an error")
//     }
// }

// export default searchCreate
