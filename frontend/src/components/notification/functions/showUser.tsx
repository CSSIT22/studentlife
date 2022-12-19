import { Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import API from "src/function/API";

//thx to Chat module for handleImg+bufferToImg kub
function buffer_to_img(data: any) {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));
    return `data:image/png;base64,${base64String}`
}
function handleImg(e: any) {
    if (e === null) {
        return ""
    }
    else {
        return buffer_to_img(e.data)
    }
}

export function showUser(sender: string | null, userId: string, module: string) {
    const [senderImg, setsenderImg] = useState([])

    useEffect(() => {
        API.get("/notification/getsenderimage/" + sender).then(
            item => setsenderImg(item.data.image)
        )
    }, [])

    if (sender == userId) {
        return (
            <Avatar bgColor="orange.500" name={module} size={"sm"} />
        )
    } else {
        return (
            <Avatar src={handleImg(senderImg)} size={"sm"} />
        )
    }

}
