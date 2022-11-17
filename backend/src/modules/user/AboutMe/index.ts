import express from "express"

const AboutmeRoutes = express()

AboutmeRoutes.get("/getABMDetail", (req, res) =>{
    res.send("Hello")
})

AboutmeRoutes.post("/editABMDetail", (req,res) =>{
    res.send("Edit Detail")
})

export default AboutmeRoutes