import { Request, Response } from "express"

const addRestaurant = async (req: Request, res: Response) => {
    const id = req.params.id
    console.log("test")
    // try {
        console.log("test")
        const prisma = res.prisma
        const rest = await prisma.restaurant.create({
            data: {
                resId: id,
                resName: "KFC",
                lastupdated: new Date("2000-01-01 20:00:00"),
                likes: 4412,
                isSeen: false,
                detail: {
                    create: {
                        
                        phoneNo: "0948421111",
                        website: "https://www.facebook.com/KFC",
                        location:
                            "https://www.google.co.th/maps/place/Kitchen+Chef's/@13.6507195,100.2337793,11z/data=!4m10!1m2!2m1!1sKitchen+Chef's!3m6!1s0x30e2a354aad8ebf5:0x479bb05defc2e495!8m2!3d13.6507195!4d100.4974512!15sCg5LaXRjaGVuIENoZWYnc1oQIg5raXRjaGVuIGNoZWYnc5IBCnJlc3RhdXJhbnTgAQA!16s%2Fg%2F11qqqp5q9n",
                        vicinity: "behind KMUTT",
                        latitude: 13.651093941884131,
                        longitude:  100.48866428780377,
                        
                    },
                },
                closeAt: {
                    createMany: {
                        data: [
                            { close: new Date("20:00:00"), day: 1 },
                            { close: new Date("20:00:00"), day: 2 },
                            { close: new Date("20:00:00"), day: 3 },
                            { close: new Date("20:00:00"), day: 4 },
                            { close: new Date("20:00:00"), day: 5 },
                            { close: new Date("20:00:00"), day: 6 },
                            { close: new Date("20:00:00"), day: 7 },
                        ],
                    },
                },
                openAt: {
                    createMany: {
                        data: [
                            { open: new Date("10:00:00"), day: 1 },
                            { open: new Date("10:00:00"), day: 2 },
                            { open: new Date("10:00:00"), day: 3 },
                            { open: new Date("10:00:00"), day: 4 },
                            { open: new Date("10:00:00"), day: 5 },
                            { open: new Date("10:00:00"), day: 6 },
                            { open: new Date("10:00:00"), day: 7 },
                        ],
                    },
                },
                images: {
                    createMany: {
                        data: [
                            {
                                image: "https://www.google.co.th/maps/place/Kitchen+Chef's/@13.6507552,100.4974913,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPW92joMhNmlEsozG8bcio8cqlyqMpGpRt9Ls50!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPW92joMhNmlEsozG8bcio8cqlyqMpGpRt9Ls50%3Dw86-h114-k-no!7i3024!8i4032!4m10!1m2!2m1!1sKitchen+Chef's!3m6!1s0x30e2a354aad8ebf5:0x479bb05defc2e495!8m2!3d13.6507195!4d100.4974512!15sCg5LaXRjaGVuIENoZWYnc1oQIg5raXRjaGVuIGNoZWYnc5IBCnJlc3RhdXJhbnTgAQA!16s%2Fg%2F11qqqp5q9n#",
                            },
                            {
                                image: "https://www.google.co.th/maps/place/Kitchen+Chef's/@13.6507552,100.4974913,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipO8EMIh2xuIhTMuxSHwrVtuXvY5i7A-gVMFd_yv!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO8EMIh2xuIhTMuxSHwrVtuXvY5i7A-gVMFd_yv%3Dw203-h152-k-no!7i4032!8i3024!4m10!1m2!2m1!1sKitchen+Chef's!3m6!1s0x30e2a354aad8ebf5:0x479bb05defc2e495!8m2!3d13.6507195!4d100.4974512!15sCg5LaXRjaGVuIENoZWYnc1oQIg5raXRjaGVuIGNoZWYnc5IBCnJlc3RhdXJhbnTgAQA!16s%2Fg%2F11qqqp5q9n#",
                            },
                            {
                                image: "https://www.google.co.th/maps/place/Kitchen+Chef's/@13.6507552,100.4974913,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipO8EMIh2xuIhTMuxSHwrVtuXvY5i7A-gVMFd_yv!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipO8EMIh2xuIhTMuxSHwrVtuXvY5i7A-gVMFd_yv%3Dw203-h152-k-no!7i4032!8i3024!4m10!1m2!2m1!1sKitchen+Chef's!3m6!1s0x30e2a354aad8ebf5:0x479bb05defc2e495!8m2!3d13.6507195!4d100.4974512!15sCg5LaXRjaGVuIENoZWYnc1oQIg5raXRjaGVuIGNoZWYnc5IBCnJlc3RhdXJhbnTgAQA!16s%2Fg%2F11qqqp5q9n#",
                            },
                        ],
                    },
                },
            },
        })
        res.send(rest)
    // } catch (err) {
    //     console.log("Error")
    // }
}

export default addRestaurant
