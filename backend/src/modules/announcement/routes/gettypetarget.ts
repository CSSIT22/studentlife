import { Request, Response } from "express"

const getTypeTarget = async (req: Request, res: Response) => {
    // const type = req.body.type
    const prisma = res.prisma

    try {
        // if(type == "Faculty"){
        //     const allFac = await prisma.faculty.findMany({
        //         select: {
        //             facultyName:true
        //         }
        //     })
        //     res.send(allFac)
        //     // console.log(allFac);
        // } else if(type == "Major"){
        //     const allMajor = await prisma.major.findMany({
        //         select:{
        //             majorName:true
        //         }
        //     })
        //     res.send(allMajor)
        //     // console.log(allMajor);
        // } else if(type == "Year"){
        //     let year = new Date()
        //     const thaiYear = (year.getFullYear() + 543) % 100
        //     console.log(thaiYear);

        //     // const key = thaiYear - parseInt(targetValue) + 1
        //     const allStudentId = await prisma.user_Profile.findMany({
        //         select: {
        //             studentId: true
        //         }
        //     })
        //     const allYear= allStudentId.map((el) => {
        //         return el.studentId.substring(0, 2)
        //     })
        //     // find unique number
        //     const nn = new Set(allYear)
        //     const uniqueYear = [...nn];
        //     const resultYear:string[] = []
        //     for(let i=0;i<uniqueYear.length;i++){
        //         resultYear.push((thaiYear - parseInt(uniqueYear[i])+1)+"")
        //     }
        //     // console.log(resultYear);
        //     res.send(resultYear)

        // }
        let targetvalue = [{
            Faculty:<string[]> [

            ],
            Major: <string[]>[

            ],
            Year:<string[]>[

            ]
        }]
        const allFac = await prisma.faculty.findMany({
            select: {
                facultyName: true,
            },
        })
        allFac.forEach((el) => (targetvalue[0].Faculty.push(el.facultyName)))

        const allMajor = await prisma.major.findMany({
            select: {
                majorName: true,
            },
        })
        allMajor.forEach((el) => (targetvalue[0].Major.push(el.majorName)))

        let year = new Date()
        const thaiYear = (year.getFullYear() + 543) % 100

        const allStudentId = await prisma.user_Profile.findMany({
            select: {
                studentId: true,
            },
        })
        const allYear = allStudentId.map((el) => {
            return el.studentId.substring(0, 2)
        })
        // find unique number
        const nn = new Set(allYear)
        const uniqueYear = [...nn]
        const resultYear = []
        for (let i = 0; i < uniqueYear.length; i++) {
            resultYear.push({year:thaiYear - parseInt(uniqueYear[i]) + 1 + ""})
        }
        resultYear.forEach((el) => (targetvalue[0].Year.push(el.year)))

        res.send(targetvalue)
        console.log(targetvalue);
        

        
    } catch (err) {
        res.status(500)
    }
}

export default getTypeTarget
