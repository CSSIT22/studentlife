import express, { Request, json } from "express"
import { filterWord } from "../backendService/middleware/filterWord"
import getQuestions from "./routes/getQuestions"
import getMyQuestions from "./routes/getMyQuestions"
import createQuestion from "./routes/createQuestion"
import createQMent from "./routes/createQMent"
import deleteMyQuestion from "./routes/deleteMyQuestion"

const qaRoutes = express()

qaRoutes.use(json())

qaRoutes.get("/", getQuestions)

qaRoutes.get("/myquestions/:userid", getMyQuestions)

qaRoutes.post("/create/:userid", createQuestion)

qaRoutes.post("/:qid", createQMent)

qaRoutes.delete("/myquestions/:qid", deleteMyQuestion)

export default qaRoutes
