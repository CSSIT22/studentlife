import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const path = require("path")

const communityRouters = express()
communityRouters.use(express.json())