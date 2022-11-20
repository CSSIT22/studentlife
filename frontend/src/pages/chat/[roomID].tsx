import { Avatar, Box, Button, Circle, Flex, Input, SkeletonCircle, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Clist from "../../components/chat/Chat-list"
import AppBody from "../../components/share/app/AppBody"
import { BsBell, BsBellSlash } from "react-icons/bs"
import { AiFillThunderbolt } from "react-icons/ai"
import { FiSend } from "react-icons/fi"
import Plustoggle from "src/components/chat/Pbutton"
import { BiSticker } from "react-icons/bi"
import { render } from "react-dom"

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
    const [isMute, setIsMute] = useState(false)

    const filterRoom = mockRoom.filter((e) => {
        return e.roomID === param.roomID
    })
    const result = filterRoom[0]
    console.log(result)

    return (
        <AppBody>
            <Flex>
                <Clist />
                <Box w={"600px"} bg="#FFF2E6" marginLeft={8} minH={"80vh"} rounded={"lg"}>
                    <Flex h={"55px"} alignItems={"center"} bg="#E68E5C" justifyContent={"space-between"}>
                        <Flex alignItems={"center"}>
                            <Avatar marginLeft={4} name={result.roomName} src={result.img} />
                            <Box fontSize={"2xl"} fontWeight={"bold"} marginLeft={5}>
                                {result.roomName}
                            </Box>
                        </Flex>
                        <Flex marginRight={4}>
                            <Box marginX={5}>
                                <Box cursor={"pointer"} onClick={() => setIsMute(!isMute)}>
                                    {isMute ? <BsBellSlash color="" fontSize={"2rem"} /> : <BsBell fontSize={"2rem"} />}
                                </Box>
                            </Box>
                            <Box>
                                <AiFillThunderbolt cursor={"pointer"} size={35} />
                            </Box>
                        </Flex>
                    </Flex>

                    <Flex h={"55px"} bg="#E68E5C" justifyContent={"space-between"} alignItems={"center"} marginTop={"80vh"}>
                        <Plustoggle />
                        <Input
                            isInvalid
                            width={"md"}
                            size={"md"}
                            placeholder="Type something"
                            _placeholder={{ color: "#F8B88B" }}
                            type={"text"}
                            focusBorderColor="#606070"
                            errorBorderColor="#F8B88B"
                        />
                        <Flex>
                            <Box cursor={"pointer"} marginRight={2}>
                                <BiSticker size={30} />
                            </Box>
                            <Box cursor={"pointer"} marginRight={4}>
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
