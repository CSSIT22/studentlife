import express from "express"
import { Prisma} from "@prisma/client"
import getRoom from "./router/getRoom";
const chatRoutes = express()

chatRoutes.get('/',getRoom);


export default chatRoutes
