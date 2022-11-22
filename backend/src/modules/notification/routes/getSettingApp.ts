import { getSetting, Setting, setting } from ".."
import { Request, Response } from "express"

const getSettingApp = (req: Request, res: Response) => {
    const id = req.params.id
    let selectedUser: Setting | null = null
    getSetting().forEach((user) =>{
        if(user.id == id){
            selectedUser = user
        }
    })
    if(selectedUser != null){
        return res.send(selectedUser)
    }
    return res.status(404).send("User not found")
}
export default getSettingApp