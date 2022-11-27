import { Notiobject } from "@apiType/notification"
import express from "express"
import getUserNotiObject from "./routes/getUserNotiObject"
import markallasRead from "./routes/markallasRead"
import readNotiObject from "./routes/readNotiObject"
import getNotiUser from "./routes/getNotiUser"

//mockup data
import { DESCRIPTION } from "./routes/mockupData/descTest"
import { USER } from "./routes/mockupData/userProfile"
import addNotiObject from "./routes/addNotiObject"
import getValue from "./routes/getValue"
import getUserNotiObjectbyModule from "./routes/getUserNotiObjectbyModule"

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

export type Setting = {
    id: string
    appSettingType: number
    emailSettingType: number
}

export let setting: Setting[] = [
    { id: USER[0].id, appSettingType: 1, emailSettingType: 3 },
    { id: USER[1].id, appSettingType: 2, emailSettingType: 2 },
    { id: USER[2].id, appSettingType: 3, emailSettingType: 1 },
    //{ id: USER[3].id, appSettingType: 1, emailSettingType: 3 }
]

export const getSetting = () => setting
export const setSetting = (newData: Setting[]) => {
    setting = newData
}

const notificationRoutes = express()
notificationRoutes.use(express.json())

notificationRoutes.get("/getusernotiobject", getUserNotiObject)
notificationRoutes.get("/getNotiUser", getNotiUser)
notificationRoutes.get("getvalue", getValue)
notificationRoutes.get("/getusernotiobjectbymodule/:module", getUserNotiObjectbyModule)

notificationRoutes.post("/addnotiobject", addNotiObject)
notificationRoutes.post("/readnotiobject/:notiObjectId", readNotiObject)
notificationRoutes.post("/markallasread/:module", markallasRead)

export default notificationRoutes
