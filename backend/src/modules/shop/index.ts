import express from "express"

const shopRoutes = express()



shopRoutes.use(express.json())

shopRoutes.get("/getAllProducts", (req, res) => {
    res.send([1,2,3,4])
})
shopRoutes.get("/getProductInformation", (req, res) => {
    let prodId = req.body.productId
    res.send(prodId)
})

export default shopRoutes
