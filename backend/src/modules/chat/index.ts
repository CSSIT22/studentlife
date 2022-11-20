import { Room_Type } from "@prisma/client";
import express from "express"
import getRoom from "./router/getRoom"
const chatRoutes = express.Router();
chatRoutes.use(express.json())

//mock-up data

type Room = {
    roomId : string,
    roomName : string,
    chatColor : string,
    createAt : string,
    roomtype : Room_Type;
    image : string
}
type UserProfile = {
    fname : string,
    lname : string,
    image : string
}

let User : UserProfile[] = [
    {fname : "Neng" , lname : "Sitiporn" , image : "https://picsum.photos/200"},
    {fname : "Somchai" , lname : "yaimark" , image : "https://picsum.photos/200"},
    {fname : "lamda" , lname : "fssdsd" , image : "https://picsum.photos/200"},
]

let Room : Room[] = [
    {roomId : "1" , roomName : "Neng" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL",image : "https://picsum.photos/200"},
    {roomId : "2" , roomName : "Tine" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL",image : "https://picsum.photos/200"},
    {roomId : "3" , roomName : "Oil" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL",image : "https://picsum.photos/200"},
    {roomId : "4" , roomName : "Gift" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL",image : "https://picsum.photos/200"},
    {roomId : "4" , roomName : "WE ARE THE ONE" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"GROUP",image : "https://picsum.photos/200"},
]

// function get data




//routes

chatRoutes.get("/",(req,res)=>{
    res.json(Room);
})


export default chatRoutes
