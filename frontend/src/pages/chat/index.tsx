import { Box, Flex, Portal } from "@chakra-ui/react"
import Clist from "../../components/chat/Chat-list"
import AppBody from "../../components/share/app/AppBody"

// type room = { roomID: String; roomName: String; roomtype: "individual" | "group", img :String }[]

// const mockRoom: room = [
//     { roomID: "1324", roomName: "Neng", roomtype: "individual",img :"https://s.thistine.com/dog" },
//     { roomID: "1123", roomName: "Oil", roomtype: "individual" ,img :"https://s.thistine.com/dog"},
//     { roomID: "3333", roomName: "Gift", roomtype: "individual" , img :"https://s.thistine.com/dog"},
//     { roomID: "4444", roomName: "Tine", roomtype: "individual" , img :"https://s.thistine.com/dog"},
//     { roomID: "5555", roomName: "4Young", roomtype: "group",img:"https://s.thistine.com/rodo" },
//     { roomID: "6666", roomName: "Toddy", roomtype: "individual" , img:"https://s.thistine.com/dog"},
//     { roomID: "7777", roomName: "Kevin", roomtype: "individual" , img:"https://s.thistine.com/dog" },
//     { roomID: "8888", roomName: "Parn", roomtype: "individual" ,img:"https://s.thistine.com/dog"},
//     { roomID: "9999", roomName: "Almas", roomtype: "individual",img:"https://s.thistine.com/dog" },
// ]
const Chat = () => {
    return (
        <AppBody>
            <Portal>
                <Clist/>
            </Portal>
        </AppBody>
    )
}
export default Chat
