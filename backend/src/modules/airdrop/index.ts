import express,{Request,Response} from "express"
import fileRoutes from "./fileRoutes";
import userRoutes from "./userRoutes";
const airdropRoutes = express()

airdropRoutes.get("/",(req:Request,res:Response)=>{
    res.send("Welcome to airdrop API");
});
airdropRoutes.use("/file",fileRoutes);
airdropRoutes.use("/user",userRoutes);

export default airdropRoutes
