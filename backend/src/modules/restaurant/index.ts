import express from "express"
import likedRestaurant from "./routes/likedRestaurant"
import showRestaurant from "./routes/showRestaurant"
import showDetail from "./routes/showDetail"
import searchRestaurant from "./routes/searchRestaurant"
import showReview from "./routes/showReview"
import showFavorite from "./routes/showFavorite"
import { review } from "./review"
import showHistory from "./routes/showHistory"
import { Restaurant } from "@apiType/restaurant"
import { verifyUser } from "../backendService/middleware/verifyUser"
import deleteFavorite from "./routes/deleteFavorite"
import addFavorite from "./routes/addFavorite"
import addRestaurant from "./routes/addRestaurant"
import { Request, Response } from "express"
import updateRestaurant from "./routes/updateRestaurant"

const restaurantRoutes = express()
restaurantRoutes.use(express.json())

export let restaurant: Restaurant[] = [
    {
        userid: 101,
        id: 0,
        resName: "Kitchen cheif's",
        amountOflike: 123,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: false,
        isFavorite: true,
        date: "120222",
        img: [
            "https://cdn.vox-cdn.com/thumbor/OheW0CNYdNihux9eVpJ958_bVCE=/0x0:5996x4003/1200x900/filters:focal(1003x1633:1961x2591)/cdn.vox-cdn.com/uploads/chorus_image/image/51830567/2021_03_23_Merois_008.30.jpg",
            "https://media.timeout.com/images/105843871/image.jpg",
            "https://images.otstatic.com/prod1/42062542/3/huge.jpg",
        ],
    },
    {
        userid: 101,
        id: 1,
        resName: "BingSO",
        amountOflike: 442,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: false,
        date: "120122",
        img: [
            "https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg",
            "https://imgmedia.lbb.in/media/2019/08/5d64c7fe2db4ea7280825680_1566885886680.jpg",
            "https://assets.architecturaldigest.in/photos/60083c82d3054f83c2ded81c/16:9/w_2560%2Cc_limit/Ishaara-Lower-Parel-Mumbai-restaurant-1366x768.jpg",
        ],
    },
    {
        userid: 102,
        id: 2,
        resName: "KFC",
        amountOflike: 95,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: false,
        date: "091122",
        img: [
            "https://assets.brandinside.asia/uploads/2018/11/KFC.jpg",
            "https://www.eatthis.com/wp-content/uploads/sites/4/2019/05/kfc-restaurant-exterior.jpg?quality=82&strip=1",
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/54/e9/c0/interior-do-kfc.jpg",
        ],
    },
    {
        userid: 102,
        id: 3,
        resName: "MC",
        open: "09.00",
        amountOflike: 15,
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: false,
        date: "270822",
        img: [
            "https://img.salehere.co.th/p/1200x0/2020/10/09/9d1tyfldbnyh.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/7b/86/a2/mcdonnald-s.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/ac/d4/a7/mc-donald-tesco-lotus.jpg",
        ],
    },
    {
        userid: 101,
        id: 4,
        resName: "Amazon",
        open: "09.00",
        amountOflike: 8,
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: true,
        date: "111122",
        img: [
            "https://thestandard.co/wp-content/uploads/2021/10/cafe-amazon-1000-international-branches-within-2568.jpg",
            "https://www.bitec.co.th/wp-content/uploads/2021/06/DSC04756-scaled.jpg",
            "https://www.bitec.co.th/wp-content/uploads/2021/06/DSC04773-scaled.jpg",
        ],
    },
    {
        userid: 103,
        id: 5,
        resName: "StarBuck",
        amountOflike: 1668,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: false,
        date: "180722",
        img: [
            "https://www.emporium.co.th/wp-content/uploads/2017/10/e9f427fe626ffb761c16dbdf3e5475c1-1024x683.jpg",
            "https://mustsharenews.com/wp-content/uploads/2022/09/starbucks-singapore-data-breach.jpg",
            "https://www.amarinplaza.com/storage/upload/store/gallery/klN9x7ZpVSKl6Wjkmae5qtKOp3uYKeiktnlfiO3l.jpeg",
        ],
    },
    {
        userid: 102,
        id: 6,
        resName: "Ping House",
        amountOflike: 442,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: true,
        date: "250922",
        img: [
            "https://media-cdn.tripadvisor.com/media/photo-s/04/b4/74/34/ping-house.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/09/e3/2a/31/ho-ping-house.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-p/12/10/65/0c/vicky-s-house.jpg",
        ],
    },
    {
        userid: 103,
        id: 7,
        resName: "Bear House",
        amountOflike: 95,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: false,
        date: "190922",
        img: [
            "https://res.klook.com/image/upload/activities/rtihxwt41d76gj2tincn.jpg",
            "https://partyspacedesign.com/wp-content/uploads/2020/03/PSD20Bearhouse_05.jpg",
            "https://www.bkkmenu.com/files/2019/06/IMG_0441.jpg",
        ],
    },
    {
        userid: 101,
        id: 8,
        resName: "Tenjo",
        open: "09.00",
        amountOflike: 15,
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        isFavorite: true,
        date: "210522",
        img: [
            "https://hello2day.com/wp-content/uploads/2015/07/tenjo-sushi-and-yakiniku-premium-buffet-1.jpg",
            "https://cdn.eatigo.com/eatigo_TenjoSushiampYakinikuPremiumBuffetGatewayEkamai_20151125160718_3816.jpg",
            "https://cdn.eatigo.com/eatigo_TenjoSushiampYakinikuPremiumBuffetTheBrightRama2_20160107104412_2449.jpg",
        ],
    },
    {
        userid: 101,
        id: 9,
        resName: "Zen",
        open: "09.00",
        amountOflike: 8,
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: false,
        isFavorite: true,
        date: "200222",
        img: [
            "https://www.scb.co.th/content/dam/scb/personal-banking/stories-tips/zen/zen-pic1.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/38/a0/af/20201023-154733-largejpg.jpg",
            "https://www.joinalifethailand.com/wp-content/uploads/2019/02/ZEN-Patong-23.02.19_190225_0011.jpg",
        ],
    },
]

export const getRestaurant = () => restaurant
export const setRestaurant = (newData: Restaurant[]) => {
    restaurant = newData
}
export const getReview = () => review

restaurantRoutes.get("/search", searchRestaurant)
restaurantRoutes.post("/favorite", deleteFavorite)
restaurantRoutes.get("/favorite", showFavorite)
restaurantRoutes.get("/history", showHistory)
restaurantRoutes.get("/:id", verifyUser, showRestaurant)
restaurantRoutes.post("/:id", likedRestaurant)
restaurantRoutes.get("/detail/:id", showDetail)
restaurantRoutes.post("/detail/:id", addFavorite)
restaurantRoutes.get("/review/:id", showReview)
restaurantRoutes.post("/addRestaurant/:id", addRestaurant)
restaurantRoutes.put("/update", updateRestaurant)

// restaurantRoutes.delete("/delete", async (req: Request, res: Response)=> {
//     const prisma = res.prisma
//     const deleteRes = await prisma.restaurant.delete({
//         where: {
//          resId:"0000"
//         },
//       })
//       res.send(deleteRes)
// })

export default restaurantRoutes
