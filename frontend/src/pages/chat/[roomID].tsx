import { Avatar, Box, Button, Flex, Hide, HStack, Input } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Clist from "../../components/chat/Chat-list"
import AppBody from "../../components/share/app/AppBody"
import { BsBell, BsBellSlash } from "react-icons/bs"
import { AiFillThunderbolt } from "react-icons/ai"
import { FiSend } from "react-icons/fi"
import Plustoggle from "src/components/chat/Pbutton"
import { BiSticker } from "react-icons/bi"
import TextBar from "../../components/chat/textConversation"
import API from "src/function/API"
import { buffer_to_img } from "src/components/chat/function/64_to_img"
import { socketContext } from "src/context/SocketContext"

type room = { roomID: string; roomName: string; roomtype: "individual" | "group"; img: string }[]


const mockMessage = [
    { text: "Hi,how are you doing?", from: "others", timeSent: "20:10" },
    { text: "I'm doing good, hbu?", from: "me", timeSent: "20:11" },
    { text: "I'm so so. Thx", from: "others", timeSent: "20:15" },
    { text: "Where are u from?", from: "me", timeSent: "20:16" },
    { text: "Hmm..", from: "others", timeSent: "20:19" },
    { text: "wait..? what?", from: "me", timeSent: "20:27" },
    { text: "I guess I'm from your heart", from: "others", timeSent: "20:32" },
]

const Room = () => {
    let param = useParams()
    const { socketIO } = useContext(socketContext)
    const [isMute, setIsMute] = useState(false)
    const [Text, setText] = useState("")
    const [msg, setmsg] = useState(mockMessage)
    const [Room, setRoom] = useState({ roomId: "", roomName: "", image: { data: "" },userId :"" })

    //fetch API
    useEffect(() => {
        API.get(`chat/${param.roomID}`).then((e) => setRoom(e.data))
    }, [param])

    //function
    function onType(e: any) {
        setText(e.target.value)
    }

    function onSend() {
        setmsg([...msg, { text: Text, from: "me", timeSent: "21:11" }])
        socketIO.emit("send-msg", { userId: Room.userId, roomId: Room.roomId, message: Text })
        setText("")
    }
    return (
        <AppBody>
            <HStack>
                <Hide below="md">
                    <Clist />
                </Hide>
                <Flex
                    flex={1}
                    bg="#FFF2E6"
                    marginLeft={{ base: 0, md: 5 }}
                    width={{ base: "100%", md: "300px" }}
                    justifyContent={"space-between"}
                    height={"78vh"}
                    flexDirection={"column"}
                // maxH={'5000px'}
                >
                    <Flex
                        alignItems={"center"}
                        bg="#E68E5C"
                        justifyContent={"space-between"}
                        width={{ base: "100%", md: "auto" }}
                        roundedTopLeft={"lg"}
                        roundedTopRight={"lg"}
                        py={2}
                    >
                        <Flex alignItems={"center"}>
                            <Avatar marginLeft={4} name={Room.roomName} src={buffer_to_img(Room.image.data)} />
                            <Box fontSize={"2xl"} fontWeight={"bold"} marginLeft={5} color={"#ffff"}>
                                {Room.roomName}
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

                    <Box overflowY={"auto"} flex={1} bg="#FFF2E6" width={{ base: "100%", md: "auto" }} maxH={"65vh"}>
                        {msg.map(({ text, from, timeSent }, roomID) => (
                            <TextBar key={roomID} message={text} timeSent={timeSent} from={from} />
                        ))}
                    </Box>

                    <Flex h={"55px"} bg="#E68E5C" justifyContent={"space-between"} alignItems={"center"} width={{ base: "100%", md: "auto" }}>
                        <Plustoggle />
                        <Input
                            marginLeft={5}
                            isInvalid
                            width={"md"}
                            size={"md"}
                            placeholder="Type something"
                            _placeholder={{ color: "#F8B88B" }}
                            type={"text"}
                            focusBorderColor="#606070"
                            errorBorderColor="#F8B88B"
                            onChange={(e) => onType(e)}
                            value={Text}
                        />
                        <Flex>
                            <Box cursor={"pointer"} marginRight={4}>
                                <BiSticker size={30} />
                            </Box>
                            <Button cursor={"pointer"} marginRight={4} onClick={onSend} disabled={(Text == "") ? true : false} variant={'unstyled'} >
                                <FiSend size={30} />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </HStack>
        </AppBody>
    )
}
export default Room
