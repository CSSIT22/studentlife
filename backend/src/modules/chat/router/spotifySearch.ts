import { Request, Response } from "express"
import axios from "axios"
const spotify = async (req: Request, res: Response) => {
    const name = "die for you"
    const params = {
        q: name,
        type: "track",
        market: "TH",
    }
    const result = await axios.get("https://api.spotify.com/v1/search", {
        params,
        headers: {
            Authorization:
                "Bearer BQBEfSOSgSMvxdXGzKQiI1EM1OBDQ0C6LEp14czKkvf3p3UlejXR-guee9b1h74rePt6KPCGja3PMn959bKv9KPKw-pDI6t2mBpK_bLafFEayE5NqaRrwBeE7ZHODvnGzZHIfwkXCxQs4MgnOO_B9hDEgDigK_WqdHpVBERD9tlg",
        },
    })
    res.send(result.data)
}
export default spotify
