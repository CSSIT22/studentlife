import express,{Request,Response} from "express"
const path = require("path");

const multer = require("multer");

//config destionation here
const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
      cb(null, path.join(__dirname,"/files"))
    },
    filename: function (req:any, file:any, cb:any) {
      cb(null, file.originalname + path.extname(file.originalname)) 
    }
  })
const upload = multer({storage:storage});

const fileRoutes = express()


fileRoutes.post("/upload",upload.array('files'),(req:Request,res:Response)=>{
    console.log("Upload sucessful");
    console.log(req.body);
});
export default fileRoutes;