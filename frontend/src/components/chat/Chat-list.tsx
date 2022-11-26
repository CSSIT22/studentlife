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

// type room = { roomID: String; roomName: String; roomtype: "individual" | "group"; img: String }[]
const Clist: FC<any> = () => {
    const [userRoom, setuserRoom] = useState<any>([])
    const [target, setTarget] = useState(1)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        API.get("/chat").then((e) => setuserRoom(e.data))
    }, [])

    //function handle
    function Navigate(target: any) {
        return navigate(`/chat/${target}`)
    }
    function Seach(e: any) {
        return setSearch(e.target.value)
    }

    function DeleteRoom(e: any) {
        const result = userRoom.filter((el: any) => el.roomId !== e.roomId)
        setuserRoom(result)
    }
    function handleImg(e : any){
        if(e === null){
            return ""
        }
        else{
            return buffer_to_img(e.data)
        }
    }

    //component FC

    const Cmenu: FC<any> = (props) => {
        const room = props.room
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
    
    const renderRoom = (e: any) => {
        if (target === 1 && e.roomType === "INDIVIDUAL") {
            return (
                <Flex justify={"space-between"} alignItems={"center"} key={e.roomId} paddingRight={5} paddingLeft={5}>
                    <Flex
                        alignItems={"center"}
                        key={e.roomId}
                        marginY={3}
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                        transitionDuration="300ms"
                        onClick={() => Navigate(e.roomId)}
                        w={"93%"}
                    >
                        <Avatar name={e.roomName} src={handleImg(e.roomIndividual.chatWith.image)} />
                        <Box marginLeft={"5"}>{e.roomName} </Box>
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
        if (target === 2 && e.roomType === "GROUP") {
            return (
                <Flex justify={"space-between"} alignItems={"center"} key={e.roomId} paddingRight={5} paddingLeft={5}>
                    <Flex
                        alignItems={"center"}
                        key={e.roomId}
                        marginY={3}
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                        transitionDuration="300ms"
                        onClick={() => Navigate(e.roomId)}
                        w={"93%"}
                    >
                        <Avatar name={e.roomName} src={e.roomGroup.groupImg} />
                        <Box marginLeft={"5"}>{e.roomName} </Box>
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
        <Box minH={"78vh"} background="orange.200kk" width={{ base: "100%", md: "300px" }} bg={"orange.200"} rounded={"2xl"}>
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
