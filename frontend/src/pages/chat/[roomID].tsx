import { Avatar, Box, Button, calc, Flex, Heading, Hide, HStack, Input, Textarea, useBoolean } from "@chakra-ui/react"
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
import { useRef } from "react"
import Lottie from "lottie-react"
import chatL from "./animation/chatL.json"
import socket from "src/function/socket"

export type RoomType = {
    chatColor: string
    roomId: string
    roomType: string
    nickname: string
    nameWho: {
        image: {
            type: string
            data: string
        } | null
    }
    group: {
        roomName: string
    }
    userId : string
}
export type message = {
    _id : string
    roomId : string
    messageType : [
        string
    ]
    created : string
    message :string
    senderId : string

}

const Room = () => {
    let param = useParams()
    const { socketIO } = useContext(socketContext)
    const [isMute, setIsMute] = useState(false)
    const [Text, setText] = useState("")
    const [msg, setmsg] = useState<message[]>([])
    const [Room, setRoom] = useState<RoomType>()
    const scroll = useRef<null | HTMLDivElement>(null)
    const [isLoading, { off }] = useBoolean(true)
    //fetch API
    useEffect(() => {
        API.get(`chat/${param.roomID}`)
            .then((e) => setRoom(e.data))
        API.get(`chat/${param.roomID}/getMessage`).then((e)=>setmsg(e.data)).finally(()=>off())
    }, [param])

    useEffect(() => {
        scroll.current?.scrollIntoView()
    }, [msg])

    useEffect(()=>{
        const setmsgfunc =(s: any) => {
            setmsg(s)
         }
        socketIO.on(`receive-message-${param.roomID}`,setmsgfunc )
        return ()=>{
            socketIO.off(`receive-message-${param.rooomID}`,setmsgfunc)
        }
    
    },[socketIO,param.roomID])

    //function
    function onType(e: any) {
        setText(e.target.value)
    }

    function onSend(e: any) {
        e.preventDefault()
        if (Text == "") {
            alert("ไม่ให้ส่งคั้บ")
        } else {
            //API.post(`chat/${param.roomID}/postMessage`,{type :"TEXT" ,message:Text}).then(()=> API.get(`chat/${param.roomID}/getMessage`).then((e)=>setmsg(e.data)))
            socketIO.emit("send-msg", { msg : Text , room_id :Room?.roomId,from:Room?.userId ,type:"TEXT"})
            setText("")
        }
    }
    function renderTitle() {
        if (Room?.roomType === "INDIVIDUAL") {
            const img = Room.nameWho.image
            return (
                <Flex alignItems={"center"}>
                    <Avatar marginLeft={4} name={Room.nickname} src={img === null ? "" : buffer_to_img(img?.data)} />
                    <Box fontSize={"2xl"} fontWeight={"bold"} marginLeft={5} color={"#ffff"}>
                        {Room.nickname}
                    </Box>
                </Flex>
            )
        } else {
            //const img = Room?.room.roomGroup?.groupImg
            return (
                <Flex alignItems={"center"}>
                    <Avatar marginLeft={4} name={Room?.group.roomName} src="https://picsum.photos/200/300" />
                    <Box fontSize={"2xl"} fontWeight={"bold"} marginLeft={5} color={"#ffff"}>
                        {Room?.group.roomName}
                    </Box>
                </Flex>
            )
        }
    }

    if (isLoading) {
        return (
            <AppBody>
                {/* <Heading color={"black"}>Loading</Heading> */}
                <Box w={"100%"} h={"100%"}>
                    <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100%"}>
                        <Lottie animationData={chatL} style={{ scale: 1 }} />
                    </Flex>
                </Box>
            </AppBody>
        )
    }
    if (Room === undefined) {
        return (
            <AppBody>
                <HStack>
                    <Hide below="md">
                        <Clist />
                    </Hide>
                    <Flex flex={1} justifyContent={"center"}>
                        <Box fontSize={"2xl"} >not found room </Box>
                    </Flex>
                </HStack>
            </AppBody>
        )
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
                    width={{ base: "80vw", md: "300px" }}
                    justifyContent={"space-between"}
                    height={{ base: "65vh", md: "78vh" }}
                    flexDirection={"column"}
                    // maxH={'5000px'}
                >
                    <Flex
                        alignItems={"center"}
                        bg={Room?.chatColor}
                        justifyContent={"space-between"}
                        width={{ base: "100%", md: "auto" }}
                        roundedTopLeft={"lg"}
                        roundedTopRight={"lg"}
                        py={2}
                    >
                        <Flex alignItems={"center"}>{renderTitle()}</Flex>
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
                        {
                            msg.map((e)=>{
                               return  <TextBar key={e._id} message={e.message} timeSent={e.created} from={e.senderId} color ={Room.chatColor}  myId={Room.userId}/>
                            })
                        }
                        <div ref={scroll}></div>
                    </Box>

                    <Flex h={"55px"} bg={Room?.chatColor} justifyContent={"space-between"} alignItems={"center"} width={{ base: "100%", md: "auto" }}>
                        <Plustoggle />
                        <form onSubmit={onSend}>
                            <Input
                                marginLeft={5}
                                isInvalid
                                width={{ base: "40vw", md: "sm" }}
                                size={"md"}
                                placeholder="Type something"
                                _placeholder={{ color: "#ffffff" }}
                                type={"text"}
                                focusBorderColor="#606070"
                                errorBorderColor="#ffffff"
                                onChange={(e) => onType(e)}
                                value={Text}
                            />
                        </form>
                        <Flex alignItems={"center"}>
                            <Box cursor={"pointer"} marginRight={4}>
                                <BiSticker size={30} />
                            </Box>
                            <Button cursor={"pointer"} marginRight={4} onClick={onSend} disabled={Text == "" ? true : false} variant={"unstyled"}>
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

