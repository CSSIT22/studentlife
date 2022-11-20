import { Room_Type } from "@prisma/client";
import exp from "constants";
import { Request, Response } from "express";

type Room = {
    roomId : string,
    roomName : string,
    chatColor : string,
    createAt : string,
    roomtype : Room_Type;
}
type UserProfile = {
    fname : string,
    lname : string,
    image : string
}

export let User : UserProfile[] = [
    {fname : "Neng" , lname : "Sitiporn" , image : "https://picsum.photos/200"},
    {fname : "Somchai" , lname : "yaimark" , image : "https://picsum.photos/200"},
    {fname : "lamda" , lname : "fssdsd" , image : "https://picsum.photos/200"},
]

export let Room : Room[] = [
    {roomId : "1" , roomName : "Neng" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL"},
    {roomId : "2" , roomName : "Tine" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL"},
    {roomId : "3" , roomName : "Oil" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL"},
    {roomId : "4" , roomName : "Gift" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"INDIVIDUAL"},
    {roomId : "4" , roomName : "WE ARE THE ONE" ,chatColor : "#ffffffff",createAt : "2002-02-01",roomtype:"GROUP"},
]



const getRoom = async (req: Request, res: Response) => {
    try {
       res.send(Room)
    }
    catch {
        res.status(400).send("Error can't find room")
    }
}
export default getRoom;

