import express from "express"
import getRest from "./routes/getres"
import getShop from "./routes/getshop"
import getshopImage from "./routes/getshopImage"
import getshopTry from "./routes/getshopDb"
import getshopDb from "./routes/getshopDb"
import getrestDb from "./routes/getrestDb"
import getmyreviewDb from "./routes/getmyreviewDb"
import getmyreviewDb2 from "./routes/getmyreviewDb2"
import postcomment from "./routes/postcommentDb"
import getmycommentDb from "./routes/getmycommentDb"
import getreviewDb from "./routes/getreviewDb"
import getcommentDb from "./routes/getcommentDb"
import getresDbPls from "./routes/getresDbPls"
import getcountRate from "./routes/getcountRate"
import postmyreview from "./routes/postMyreview"
import postimage from "./routes/postImage"

const shopreviewRoutes = express()

shopreviewRoutes.use(express.json())
const multer = require("multer")
const upload = multer()
export type Shop = {
    shopId: String
    name: String
    type: String
    zone: String
    amo_review: String
    amo_rate: String
    image: String
}
export type Restaurant = {
    restaurantId: String
    name: String
    type: String
    zone: String
    amo_review: String
    amo_rate: String
    image: String
}
export let shops: Shop[] = [
    {
        shopId: "1",
        name: "ร้านลุงโจ",
        type: "shop",
        zone: "หอหญิง",
        amo_review: "34",
        amo_rate: "4.5",
        image: "https://cf.shopee.co.th/file/354b570e0bbc41553d97b1bf0489dcdf",
    },
    {
        shopId: "2",
        name: "ร้านลุงแจ",
        type: "shop",
        zone: "หอชาย",
        amo_review: "35",
        amo_rate: "4.5",
        image: "https://image.makewebeasy.net/makeweb/0/ogVseGJif/attachfile/dcbb98450936fc307445ae68a4feca06.jpg",
    },
    {
        shopId: "3",
        name: "ร้านลุงจุน",
        type: "shop",
        zone: "KFC",
        amo_review: "33",
        amo_rate: "4.5",
        image: "https://sala.co.th/wp-content/uploads/2020/09/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9%E0%B8%AA%E0%B8%B5-2.jpg",
    },
    {
        shopId: "4",
        name: "ร้านลุงจิน",
        type: "shop",
        zone: "หน้ามอ",
        amo_review: "31",
        amo_rate: "4.5",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRig4jA2lJIfBL_ItpP-j98-YoPX0eRSRQmsh_DPDgtsVcdfgT_PokUzL8wCXhEXyHH5kM&usqp=CAU",
    },
    {
        shopId: "5",
        name: "ร้านลุงจอห์น",
        type: "shop",
        zone: "หลังมอ",
        amo_review: "32",
        amo_rate: "4.5",
        image: "https://royalpress.co.th/wp-content/uploads/2020/08/Choosing-Color-Paper-450x257.jpg",
    },
    {
        shopId: "6",
        name: "ร้านลุงแจน",
        type: "shop",
        zone: "หลังมอ",
        amo_review: "36",
        amo_rate: "2.4",
        image: "https://www.nextdayflyers.com/blog/wp-content/uploads/2016/03/Photo.jpg",
    },
]

export let restaurants: Restaurant[] = [
    {
        restaurantId: "1",
        name: "ร้านนี้ข้าวอร่อย",
        type: "restaurant",
        zone: "หอหญิง",
        amo_review: "44",
        amo_rate: "4.5",
        image: "https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/1:1/w_320%2Cc_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg",
    },
    {
        restaurantId: "2",
        name: "MoMo Paradise",
        type: "restaurant",
        zone: "หอชาย",
        amo_review: "45",
        amo_rate: "4.5",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/1c/08/09/d8/mo-mo-paradise.jpg",
    },
    {
        restaurantId: "3",
        name: "ป้าตุ๊กข้าวมันไก่",
        type: "restaurant",
        zone: "KFC",
        amo_review: "43",
        amo_rate: "4.5",
        image: "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSEmAUm74bI2EL8Sb34rOSLQkKjXQF.jpg",
    },
    {
        restaurantId: "4",
        name: "Bonchon",
        type: "restaurant",
        zone: "หน้ามอ",
        amo_review: "41",
        amo_rate: "4.5",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/14/b8/62/3a/bonchon-chicken-terminal.jpg",
    },
    {
        restaurantId: "5",
        name: "ซูชิ",
        type: "restaurant",
        zone: "หลังมอ",
        amo_review: "42",
        amo_rate: "4.5",
        image: "https://chillchilljapan.com/wp-content/uploads/2016/06/455.jpg",
    },
    {
        restaurantId: "6",
        name: "KFC",
        type: "restaurant",
        zone: "หอชาย",
        amo_review: "45",
        amo_rate: "4.5",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tjmnmhOkDOrRROO2CJkzcfxRcsIp-cypbg&usqp=CAU",
    },
]

export type Review = {
    reviewId: String
    shopId: String
    userId: String
    reviewdAt: String
    text: String
    rating: String
    likeReceived: String
}

export let Shop_Review: Review[] = [
    {
        reviewId: "1",
        shopId: "2",
        userId: "2",
        reviewdAt: "2019/03/20",
        text: "I really love this.",
        rating: "4",
        likeReceived: "2",
    },
    {
        reviewId: "2",
        shopId: "3",
        userId: "EvVintMSeelruxFce0vH3",
        reviewdAt: "2056/05/10",
        text: "This is not food.",
        rating: "0",
        likeReceived: "5",
    },
    {
        reviewId: "3",
        shopId: "3",
        userId: "EvVintMSeelruxFce0vH3",
        reviewdAt: "2067/12/20",
        text: "No I'm Kidding.",
        rating: "0",
        likeReceived: "5",
    },
]

export type Comment = {
    commentId: String
    likeReceived: String
    userId: String
    text: String
    shopId: String
    commentAt: String
}
export let Comments: Comment[] = [
    {
        commentId: "1",
        likeReceived: "4",
        userId: "EvVintMSeelruxFce0vH3",
        text: "+1",
        shopId: "2",
        commentAt: "2067/1/18",
    },
    {
        commentId: "2",
        likeReceived: "7",
        userId: "EvVintMSeelruxFce0vH3",
        text: "+2",
        shopId: "6",
        commentAt: "2077/2/25",
    },
    {
        commentId: "3",
        likeReceived: "45",
        userId: "7",
        text: "+1",
        shopId: "4",
        commentAt: "2047/12/10",
    },
]

export const getAllShop = () => shops

export const getAllRestaurant = () => restaurants

shopreviewRoutes.get("/getshop", (req, res) => {
    res.send(shops)
})

shopreviewRoutes.get("/getshopDb", getshopDb)
shopreviewRoutes.get("/getrestDb", getrestDb)
// shopreviewRoutes.get("/getmyreviewDb", getmyreviewDb)
// my review for shop review
// shopreviewRoutes.get("/getmyreviewDb2", getmyreviewDb2)
// my review for restaurant review
shopreviewRoutes.get("/getmycommentDb", getmycommentDb)
shopreviewRoutes.get("/getshopImageDb", getshopImage)
shopreviewRoutes.get("/shopdetails/shop/:id", getshopDb)
shopreviewRoutes.get("/shopdetails/restaurant/:id", getresDbPls)
shopreviewRoutes.get("/getreview/:id", getreviewDb)
shopreviewRoutes.get("/getcommentDb/:id", getcommentDb)
shopreviewRoutes.get("/getcountRate", getcountRate)

shopreviewRoutes.get("/getrestaurant", (req, res) => {
    res.send(restaurants)
})

shopreviewRoutes.get("/getcomment", (req, res) => {
    res.send(Comments)
})

shopreviewRoutes.get("/shopdetails/shop/:id", getshopDb)
shopreviewRoutes.get("/shopdetails/restaurant/:id", getRest)
shopreviewRoutes.post("/postmyreview", upload.array("upload"), postmyreview)
shopreviewRoutes.post("/postimage", postimage)

export default shopreviewRoutes
