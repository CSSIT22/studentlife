import express,{Request,Response} from "express"
const path = require("path");
const fs = require("fs");
const multer = require("multer");

//config destionation here
const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
     const fileType = req.body.type;
     
      cb(null, path.join(__dirname,"../files"+"/"+fileType));
    },
    filename: function (req:any, file:any, cb:any) {
      cb(null, file.originalname) 
    }
  })
const upload = multer({storage:storage});

const fileRoutes = express()


fileRoutes.post("/upload",upload.array('files'),(req:Request,res:Response)=>{
    console.log("Upload sucessful");
    console.log(req.body);
});
fileRoutes.get("/download/:type/:id",(req:Request,res:Response)=>{
  const directoryPath = path.join(__dirname, '../files'+"/"+req.params.type);
  res.download(directoryPath+"/"+req.params.id);

})
export default fileRoutes;