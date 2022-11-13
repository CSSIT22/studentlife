import { DESCRIPTION } from "./descTest"
import { USER } from "./userProfile"

export const OBJECTS = [
    {
        id: "0",
        user: USER[0].id,
        description: DESCRIPTION[0].template,
        isRead: true,
        date: new Date("November 11, 2022 22:30:00"),
        module: "Chat",
    },
    {
        id: "1",
        user: USER[1].id,

        description: "sdasdf sadf asfasf",
        isRead: false,
        date: new Date("November 11, 2022 09:38:00"),
        module: "Shop",
    },
    {
        id: "2",
        user: USER[2].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("November 9, 2022 09:38:00"),
        module: "Shop",
    },
    {
        id: "3",
        user: USER[0].id,
        description: DESCRIPTION[2].template,
        isRead: false,
        date: new Date("March 18, 2022 09:38:00"),
        module: "Chat",
    },
    {
        id: "4",
        user: USER[0].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("October 19, 2020 09:38:00"),
        module: "Chat",
    },
    {
        id: "5",
        user: USER[0].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("October 19, 2020 09:38:00"),
        module: "Chat",
    },
    {
        id: "6",
        user: USER[0].id,
        description: DESCRIPTION[1].template,
        isRead: false,
        date: new Date("November 1, 2022 09:38:00"),
        module: "Chat",
    },
]
