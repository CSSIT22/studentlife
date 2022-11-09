import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Clist from "../../components/chat/Chat-list"
import AppBody from "../../components/share/app/AppBody"
const Room = () => {
    let param = useParams()
    return (
        <AppBody>
            <Clist/>
        </AppBody>
    )
}
export default Room
