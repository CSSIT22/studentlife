import { Request, Response, NextFunction } from "express"

// path localhost:8000/backendservice/test
/**
 * need to check
 * req.body
 * req.params
 * req.query
 */
export const filterWord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = res.prisma
        const reqBody: string = JSON.stringify(req.body)
        const reqParams: string = JSON.stringify(req.params)
        const reqQuery: string = JSON.stringify(req.query)
        const words: string[] = getWords([reqBody, reqParams, reqQuery])
        res.json({ words: words })
    } catch (err: any) {
        res.status(500).json({ message: err })
    }
}

const getWords = (rawString: string[]): string[] => {
    let words: string[] = []
    rawString.forEach((item) => {
        let temp1: string[] = item
            .toLowerCase()
            .split(/[^a-z]/)
            .filter((word) => word.length > 1)
        words.push(...temp1)
    })
    return words
}
