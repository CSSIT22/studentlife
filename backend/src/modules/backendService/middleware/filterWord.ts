import express, { Request, Response, NextFunction } from "express"

const router = express.Router()

router.use(express.json())

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

const replaceBadWords = (obj: any, badWords: Array<string>): any => {
    for (let prop in obj) {
        if (typeof obj[prop] === "string") {
            badWords.forEach((word) => {
                obj[prop] = obj[prop].toLowerCase().replace(word, "*".repeat(word.length))
            })
        } else if (typeof obj[prop] === "object") {
            obj[prop] = replaceBadWords(obj[prop], badWords)
        }
    }
    return obj
}

const filterWordHandler = async (req: Request, res: Response, next: NextFunction) => {
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
            req.body = replaceBadWords(req.body, badWords)
            req.params = replaceBadWords(req.params, badWords)
            req.query = replaceBadWords(req.query, badWords)
            return next()
        }
        return next()
    } catch (err: any) {
        console.log(err)
        res.status(500).json({ message: "error from filterWord" })
    }
}

router.use(filterWordHandler)

export { router as filterWord }
