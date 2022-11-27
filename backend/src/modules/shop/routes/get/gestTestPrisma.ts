import { Request, Response } from "express"
// Works
const gestTestPrisma = async (req: Request, res: Response) => {
  const prisma = res.prisma
  try {
    const result = await prisma.shop_Categories.findMany()
    return res.send(result)
  } catch (error) {
    return res.status(404).send("Errrorrrrrrr")
  }
}

export default gestTestPrisma