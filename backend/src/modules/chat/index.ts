import express from "express"
import getRoom from "./router/getRoom"
const chatRoutes = express.Router();

chatRoutes.get("/",getRoom)


export default chatRoutes
