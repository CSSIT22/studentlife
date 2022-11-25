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
        // console.log(words)
        const filterWord = (
            await prisma.filtered_Word.findMany({
                select: { word: true },
            })
        ).map((e) => e.word)
        let badWords = words.filter((x) => filterWord.includes(x))
        if (badWords.length > 0) {
            return res.status(400).json({ message: "found bad word", badWords: badWords })
        }
        return next()
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ message: "error from filterWord" })
    }
}

const getWords = (rawString: string[]): string[] => {
    let words: string[] = []
    rawString.forEach((item) => {
        if (item) {
            let temp1: string[] = item
                .toLowerCase()
                .split(/[^a-zก-๏]/)
                .filter((word) => word.length > 1)
            words.push(...temp1)
        }
    })
    return words
}
