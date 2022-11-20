import { Notiobject } from "@apiType/notification"
import express from "express"
import addUserNotiObject from "./routes/addUserNotiObject"
import getUserNotiObject from "./routes/getUserNotiObject"
import markallasRead from "./routes/markallasRead"
import readNotiObject from "./routes/readNotiObject"

//mockup data
import { DESCRIPTION } from "./routes/mockupData/descTest"
import { USER } from "./routes/mockupData/userProfile"
export let objects = [
    {
        id: "0ygyli7",
        user: USER[0].id,
        description: DESCRIPTION[0].template,
        isRead: true,
        date: new Date("2022-10-17 09:30:00"),
        module: "Chat",
        link: "https://www.google.com/",
    },
    {
        id: "1asdfgeasd",
        user: USER[1].id,
        description: "test isRead",
        isRead: false,
        date: new Date("2022-11-14 09:38:00"),
        module: "Shop",
        link: "https://www.google.com/",
    },
    {
        id: "29348hf3",
        user: USER[2].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("2022-11-01 09:38:00"),
        module: "Shop",
        link: "https://www.google.com/",
    },
    {
        id: "39uujd3w",
        user: USER[0].id,
        description: DESCRIPTION[2].template,
        isRead: false,
        date: new Date("2022-03-12 09:38:00"),
        module: "Chat",
        link: "https://www.google.com/",
    },
    {
        id: "78uhuiold4",
        user: USER[0].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("2020-05-23 09:38:00"),
        module: "Chat",
        link: "https://www.google.com/",
    },
    {
        id: "5890iijiu",
        user: USER[0].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("2018-01-10 09:38:00"),
        module: "Chat",
        link: "https://www.google.com/",
    },
    {
        id: "60o98uiohj",
        user: USER[0].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("2017-02-18 09:38:00"),
        module: "Chat",
        link: "https://www.google.com/",
    },
]
export function getObject() {
    return objects
}
export function setObject(newobject: any) {
    objects = newobject
}

const notificationRoutes = express()
notificationRoutes.get("/getusernotiobject/:userId", getUserNotiObject)
notificationRoutes.get("/addusernotiobject", addUserNotiObject)
notificationRoutes.post("/readnotiobject/:notiObjectId", readNotiObject)
notificationRoutes.post("/markallasread/:module", markallasRead)

export default notificationRoutes
