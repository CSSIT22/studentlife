import { Box, Button, Flex, Img, Hide, Show } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { FC, useEffect, useState } from "react"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import DrawerExample from "./drawer"
import Nmodal from "./Nmodal"
import API from "src/function/API"
import { buffer_to_img } from "./function/64_to_img"

type Room = {
    room: {
        nick: [
            {
                nickname: string
                nameWho: {
                    image: {
                        type: string
                        data: string
                    }
                }
            }
        ]
        group: {
            roomName: string
        }
        chatColor: string
        roomId: string
        roomType: string
    }
}
const Clist: FC<any> = () => {
    const [userRoom, setuserRoom] = useState<Room[]>([])
    const [target, setTarget] = useState(1)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        API.get("/chat").then((e) => setuserRoom(e.data))
    }, [])

    //function handle
    function Navigate(target: any) {
        location.href = `/chat/${target}`
        // return navigate(`/chat/${target}`,{replace:false})
    }
    function Seach(e: any) {
        return setSearch(e.target.value)
    }

    async function DeleteRoom(e: Room) {
        await API.delete(`/chat/${e.room.roomId}/deleteRoom`)
        const result = await API.get(`/chat`)
        //const result = API.get
        setuserRoom(result.data)
        navigate(`/chat`)
        // console.log(e.room.roomIsd SAd);
    }
    function handleImg(e: any) {
        if (e === null) {
            return ""
        } else {
            return buffer_to_img(e.data)
        }
    }

    //component FC

    const Cmenu: FC<any> = (props: any) => {
        const room: Room = props.room
        if (room.room.roomType === "INDIVIDUAL") {
            return (
                <Menu>
                    <MenuButton>:</MenuButton>
                    <MenuList color={"black"}>
                        <MenuItem>Mute</MenuItem>
                        <MenuItem onClick={() => DeleteRoom(room)}>Deteleroom</MenuItem>
                        <MenuItem>
                            <Nmodal />
                        </MenuItem>
                    </MenuList>
                </Menu>
            )
        } else {
            return (
                <Menu>
                    <MenuButton>:</MenuButton>
                    <MenuList color={"black"}>
                        <MenuItem>Mute</MenuItem>
                        <MenuItem>
                            <Nmodal />
                        </MenuItem>
                    </MenuList>
                </Menu>
            )
        }
    }

    const renderButton = () => {
        return (
            <Flex fontSize={"2xl"} marginBottom={5} alignSelf="center">
                <Button
                    marginRight={2}
                    bg={"transparent"}
                    _active={{ background: "transparent" }}
                    _hover={{ background: "transparent", transform: "scale(1.2)" }}
                    fontSize={target === 1 ? "2xl" : "lg"}
                    textDecoration={target === 1 ? "underline" : ""}
                    transitionDuration="300ms"
                    onClick={() => setTarget(1)}
                >
                    Chat
                </Button>
                <Button
                    marginRight={2}
                    bg={"transparent"}
                    _active={{ background: "transparent" }}
                    _hover={{ background: "transparent", transform: "scale(1.2)" }}
                    fontSize={target === 2 ? "2xl" : "lg"}
                    textDecoration={target === 2 ? "underline" : ""}
                    transitionDuration="300ms"
                    onClick={() => setTarget(2)}
                >
                    Group
                </Button>
            </Flex>
        )
    }

    const renderRoom = (e: Room) => {
        if (target === 1 && e.room.roomType === "INDIVIDUAL") {
            return (
                <Flex justify={"space-between"} alignItems={"center"} key={e.room.roomId} paddingRight={5} paddingLeft={5}>
                    <Flex
                        alignItems={"center"}
                        key={e.room.roomId}
                        marginY={3}
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                        transitionDuration="300ms"
                        onClick={() => Navigate(e.room.roomId)}
                        w={"93%"}
                    >
                        <Avatar name={e.room.nick[0].nickname} src={handleImg(e.room.nick[0].nameWho.image)} />
                        <Box marginLeft={"5"} overflowX={"auto"}>{e.room.nick[0].nickname} </Box>
                    </Flex>
                    <Show above="md">
                        <Cmenu room={e} />
                    </Show>
                    <Show below="md">
                        <DrawerExample item={e} setuserRoom={setuserRoom} userRoom={userRoom} />
                    </Show>
                </Flex>
            )
        }
        if (target === 2 && e.room.roomType === "GROUP") {
            return (
                <Flex justify={"space-between"} alignItems={"center"} key={e.room.roomId} paddingRight={5} paddingLeft={5}>
                    <Flex
                        alignItems={"center"}
                        key={e.room.roomId}
                        marginY={3}
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                        transitionDuration="300ms"
                        onClick={() => Navigate(e.room.roomId)}
                        w={"93%"}
                    >
                        <Avatar name={e.room.group.roomName} src="https://picsum.photos/200/300" />
                        <Box marginLeft={"5"} overflowX={"auto"}>{e.room.group.roomName} </Box>
                    </Flex>
                    <Show above="md">
                        <Cmenu room={e} />
                    </Show>
                    <Show below="md">
                        <DrawerExample item={e} setuserRoom={setuserRoom} userRoom={userRoom} />
                    </Show>
                </Flex>
            )
        }
    }
    const renderSearch = (search: string) => {
        if (search === "") {
            return userRoom.map((e: any) => renderRoom(e))
        } else {
            const result = userRoom.filter((e: any) => e.roomName.includes(search))
            return result.map((e: any) => renderRoom(e))
        }
    }

    return (
        <Box minH={"78vh"} background="orange.200" width={{ base: "100%", md: "300px" }} bg={"orange.200"} rounded={"2xl"}>
            <Flex width={"100%"} height={"20%"} p={5} rounded={"lg"} fontWeight={"bold"} color={"white"} direction={"column"}>
                {renderButton()}
                <Input placeholder="Search" marginY={2} focusBorderColor={"white"} onChange={(e) => Seach(e)} />
                <Box overflowX={"auto"} maxH={"380px"}>
                    {renderSearch(search)}
                </Box>
            </Flex>
        </Box>
    )
}
export default Clist

