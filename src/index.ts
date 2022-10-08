import express from 'express'

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const PORT = 8000
const app = express()

app.get("/",(_,res)=>{
    return res.send("Welcome to integrated project 2022!")
})

app.listen(PORT,()=>console.log(`running on ${PORT} !`))