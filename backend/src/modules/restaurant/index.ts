import express from "express"
import likedRestaurant from "./routes/likedRestaurant"
import showRestaurant from "./routes/showRestaurant"
import {Restaurant} from "@apiType/restaurant"

const restaurantRoutes = express()

export let restaurant: Restaurant[] = [
    {
        id: 0,
        resName: "Kitchen cheif's",
        amountOflike: 123,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: false,
        img: [
            "https://cdn.vox-cdn.com/thumbor/OheW0CNYdNihux9eVpJ958_bVCE=/0x0:5996x4003/1200x900/filters:focal(1003x1633:1961x2591)/cdn.vox-cdn.com/uploads/chorus_image/image/51830567/2021_03_23_Merois_008.30.jpg",
            "https://media.timeout.com/images/105843871/image.jpg",
            "https://images.otstatic.com/prod1/42062542/3/huge.jpg",
        ],
    },
    {
        id: 1,
        resName: "BingSO",
        amountOflike: 442,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        img: [
            "https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg",
            "https://imgmedia.lbb.in/media/2019/08/5d64c7fe2db4ea7280825680_1566885886680.jpg",
            "https://assets.architecturaldigest.in/photos/60083c82d3054f83c2ded81c/16:9/w_2560%2Cc_limit/Ishaara-Lower-Parel-Mumbai-restaurant-1366x768.jpg",
        ],
    },
    {
        id: 2,
        resName: "KFC",
        amountOflike: 95,
        open: "09.00",
        close: "20.00",
        phone: "0948421111",
        website: "https://www.google.co.th",
        vicinity: "opposite KMUTT",
        status: true,
        img: [
            "https://assets.brandinside.asia/uploads/2018/11/KFC.jpg",
            "https://www.eatthis.com/wp-content/uploads/sites/4/2019/05/kfc-restaurant-exterior.jpg?quality=82&strip=1",
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/54/e9/c0/interior-do-kfc.jpg",
        ],
    },
]

export const getRestaurant = () => restaurant

restaurantRoutes.get("/:id", showRestaurant)

// restaurantRoutes.post("/:id", likedRestaurant)

export default restaurantRoutes