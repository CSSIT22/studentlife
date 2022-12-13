// import { getSetting, Setting, setting } from ".."
import { Request, Response } from "express"

const getSettingApp = (req: Request, res: Response) => {
    const id = req.params.id
    const usid = req.user?.userId
    // let selectedUser: Setting | null = null
    // getSetting().forEach((user) =>{
    //     if(user.id == usid){
    //         selectedUser = user
    //     }
    // // })
    // if(selectedUser != null){
    //     return res.send(selectedUser)
    // }
    return res.status(404).send("User not found")
}
export default getSettingApp