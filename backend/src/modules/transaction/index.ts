import express from "express"

type order = {
    orderid: string
    id:string
}

const orders:order[] = [
    {orderid:"12345",id:"1543"}
]

const transactionRoutes = express()

transactionRoutes.use(express.json())

transactionRoutes.get("/getuser",(req,res)=>{

})

export default transactionRoutes
