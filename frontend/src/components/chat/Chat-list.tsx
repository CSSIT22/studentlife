import { Box, Button, Flex, Img ,Hide,Show} from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { FC, useState } from "react"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import DrawerExample from "./drawer"

type room = { roomID: String; roomName: String; roomtype: "individual" | "group"; img: String }[]

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

const Clist: FC<any> = () => {
    const [userRoom, setuserRoom] = useState<room>(mockRoom)
    const [target, setTarget] = useState(1)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    //function handle
    function Navigate(target: any) {
        return navigate(`/chat/${target}`)
    }
    function Seach(e: any) {
        return setSearch(e.target.value)
    }

    function DeleteRoom (e:any){
        const result  = userRoom.filter((el)=> el.roomID !== e.roomID );
        setuserRoom(result);
    }

    //component FC

    const Cmenu: FC<any> = (props) => {
        const room = props.room;
        return (
            <Menu>
                <MenuButton>:</MenuButton>
                <MenuList color={"black"}>
                    <MenuItem>Mute</MenuItem>
                    <MenuItem onClick={()=>DeleteRoom(room)}>Deteleroom</MenuItem>
                    <MenuItem>Block</MenuItem>
                    <MenuItem>Report</MenuItem>
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
        if (target === 1 && e.roomtype === "individual") {
            return (
                <Flex justify={"space-between"} alignItems={"center"} key={e.roomID}>
                    <Flex
                        alignItems={"center"}
                        key={e.roomID}
                        marginY={3}
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                        transitionDuration="300ms"
                        onClick={() => Navigate(e.roomID)}
                    >
                        <Avatar name={e.Roomname} src={e.img} />
                        <Box marginLeft={"5"}>{e.roomName} </Box>
                    </Flex>
                    <Show above="md">
                        <Cmenu room={e}/>
                    </Show>
                    <Show below="md" ><DrawerExample item = {e} setuserRoom={setuserRoom} userRoom = {userRoom}/></Show> 
                </Flex>
            )
        }
        if (target === 2 && e.roomtype === "group") {
            return (
                <Flex justify={"space-between"} alignItems={"center"} key={e.roomID}>
                    <Flex
                        alignItems={"center"}
                        key={e.roomID}
                        marginY={3}
                        _hover={{
                            transform: "scale(1.1)",
                        }}
                        transitionDuration="300ms"
                        onClick={() => Navigate(e.roomID)}
                    >
                        <Avatar name={e.Roomname} src={e.img} />
                        <Box marginLeft={"5"}>{e.roomName} </Box>
                    </Flex>
                    <Show above="md">
                        <Cmenu room={e}/>
                    </Show>
                    <Show below="md" ><DrawerExample item = {e} setuserRoom={setuserRoom} userRoom = {userRoom}/></Show> 
                </Flex>
            )
        }
    }
    const renderSearch = (search: string) => {
        if (search === "") {
            return userRoom.map((e) => renderRoom(e))
        } else {
            const result = userRoom.filter((e) => e.roomName.includes(search))
            return result.map((e) => renderRoom(e))
        }
    }

    return (
        <Box minH={{ base: "80vh", md: "700px" }} background="orange.200kk" width={{ base: "100%", md: "300px" }} bg={"orange.200"} rounded={"2xl"} >
            <Flex width={"100%"} height={"20%"} p={5} rounded={"lg"} fontWeight={"bold"} color={"white"} direction={"column"}>
                {renderButton()}
                <Input placeholder="Search" marginY={2} focusBorderColor={"white"} onChange={(e) => Seach(e)} />
                {renderSearch(search)}
            </Flex>
        </Box>
    )
}
export default Clist
