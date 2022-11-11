import { Avatar, Box, Circle, Flex, Input, SkeletonCircle } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Clist from "../../components/chat/Chat-list"
import AppBody from "../../components/share/app/AppBody"
import { BsBell } from "react-icons/bs"
import { AiFillThunderbolt } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { FiSend } from "react-icons/fi"

type room = { roomID: string; roomName: string; roomtype: "individual" | "group"; img: string }[]

const mockRoom: room = [
    { roomID: "1324", roomName: "Neng", roomtype: "individual", img: "https://s.thistine.com/dog" },
    { roomID: "1123", roomName: "Oil", roomtype: "individual", img: "https://s.thistine.com/dog" },
    { roomID: "3333", roomName: "Gift", roomtype: "individual", img: "https://s.thistine.com/dog" },
    { roomID: "4444", roomName: "Tine", roomtype: "individual", img: "https://s.thistine.com/dog" },
    { roomID: "5555", roomName: "4Young", roomtype: "group", img: "https://s.thistine.com/rodo" },
    { roomID: "6666", roomName: "Toddy", roomtype: "individual", img: "https://s.thistine.com/dog" },
    { roomID: "7777", roomName: "Kevin", roomtype: "individual", img: "https://s.thistine.com/dog" },
    { roomID: "8888", roomName: "Parn", roomtype: "individual", img: "https://s.thistine.com/dog" },
    { roomID: "9999", roomName: "Almas", roomtype: "individual", img: "https://s.thistine.com/dog" },
]

const Room = () => {
    let param = useParams()
    const filterRoom = mockRoom.filter((e) => {
        return e.roomID === param.roomID
    })
    const result = filterRoom[0]
    console.log(result)

    return (
        <AppBody>
            <Flex>
                <Clist />
                <Box w={"600px"} bg="gray.200" marginLeft={8} minH={"80vh"} rounded={"lg"}>
                    <Flex alignItems={"center"} margin={5} bg="whiteAlpha.600" justifyContent={"space-between"} >
                        <Flex alignItems={"center"}>
                            <Avatar name={result.roomName} src={result.img} />
                            <Box fontSize={"2xl"} fontWeight={"bold"} marginLeft={5}>
                                {result.roomName}
                            </Box>
                        </Flex>
                        <Flex>
                            <Box marginX={5}>
                                <BsBell size={35} />
                            </Box>
                            <Box>
                                <AiFillThunderbolt size={35} />
                            </Box>
                        </Flex>
                    </Flex>

                    <Flex margin={5} bg="whitesmoke" justifyContent={"space-between"} alignItems={"center"} marginTop={"80vh"}>
                        <Flex alignItems={"center"} marginLeft={4}>
                            <FaPlus size={20} />
                        </Flex>
                        <Input width={"md"} size={"sm"} placeholder="Type something" />
                        <Flex>
                            <Box marginRight={4}>
                                <FiSend size={30} />
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </AppBody>
    )
}
export default Room