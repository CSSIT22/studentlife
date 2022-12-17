import e, { Request, Response } from "express"
import axios from "axios"
import fetch from "node-fetch"
const spotify = async (req: Request, res: Response) => {
    const name = "tattoo%20colour"
    const params = {
        q: "aaa",
        type: "track",
        market: "TH",
        limit : "10"
    }
    try {
    //     const result = await axios.get(`https://api.spotify.com/v1/search?q=${params.q}&type=${params.type}`,{
    //     responseType:"text",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization:
    //             "Bearer BQBjsCzKwJLfS_AFF9V8PyWcOz4s-yjrEVmyQJ928Y98_8gQlBSy0RSptWDBBGsUOIJ1kOWVFuSKPziLD_sX8kjR5fGckAPMXgKZ22fWskC_f1z_A9S2mYRJkW-LvQ-yEXJ94lflaPdsVC4Bm8OBSNwCqjNCoRh4-CywQkBXMQom",
    //     },
    // })
    //console.log(result.headers);
    let Authparameters = {
        method : "GET",
        headers:{
            'Content-Type' : 'application/json',
            Authorization:"Bearer BQBuw5nWjx_kjEvbhjQV19YxNKSMla2ij_W46y_GlqlCuSee19b8i58p-5mwvp5lAexnJIdno8kjamcz2mQ8KLhkRmv8ioEFsP0gshGukcxTNDsb_vuT1Uis3FvA2cVoARhDSbKjHwzYgMTJ80V5Onl6TAnfcdxJoo-b1ElLFASH",
        }
    }
    fetch(`https://api.spotify.com/v1/search?q=${params.q}&type=${params.type}`,Authparameters).then(result =>{
    result.json().then(r=>{
        res.send(r)
        
    }) 
}).catch(err=>res.send(err))
    
    //res.json(result.data)
    } catch (error) {
        res.status(200).send(error)
    }
}
export default spotify
