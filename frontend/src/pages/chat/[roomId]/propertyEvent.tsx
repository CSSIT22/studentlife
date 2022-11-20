import {
    Avatar,
    Box,
    Button,
    Heading,
    HStack,
    Input,
    VStack,
    Text,
    Flex,
    Center,
    Divider,
    border,
    InputGroup,
    InputLeftElement,
    Spacer,
    ListItem,
    UnorderedList,
    Image,
    Editable,
    EditablePreview,
    EditableInput,
} from "@chakra-ui/react"
import AppBody from "../../../components/share/app/AppBody"
import React, { useState } from "react"
import { AiFillBug, AiFillPicture, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { FaCircle } from "react-icons/fa"
import { SearchIcon } from "@chakra-ui/icons"
import API from "src/function/API"

const propertyDetail = (props: any) => {
    return <Box>{propertyEvent(props)}</Box>
}

function propertyEvent(props: any) {
    const [roomColor, setRoomColor] = React.useState("")
    const colors = ["black", "blue", "gray", "red", "green", "purple", "pink", "orange", "teal", "yellow"]

    function colorRoom(e: any) {
        return setRoomColor(e.target.value)
    }

    const [roomName,setRoomName] = useState("")
    const submitRoomName = () => {
        API.post("/chat")
    }

    const members: any = [
        { memberPic: "https://picsum.photos/200/300", memberName: "Neng1", id: "1"},
        { memberPic: "https://picsum.photos/200/300", memberName: "Neng2", id: "2"},
        { memberPic: "https://picsum.photos/200/300", memberName: "Neng3", id: "3"},
        { memberPic: "https://picsum.photos/200/300", memberName: "Neng4", id: "4"},
        { memberPic: "https://picsum.photos/200/300", memberName: "Neng5", id: "5"},
        { memberPic: "https://picsum.photos/200/300", memberName: "Neng6", id: "6"},
    ]

    const [selectedMember, setSelectedMember] = useState<any>([])

    const renderMember = (member: any) => {
            return (
                <Flex justifyContent={"space-between"} alignItems={"center"} key={member.id}>
                    <Flex alignItems={"center"}>
                        <Avatar name={member.memberName} src={member.memberPic} marginRight={4} />
                        <Heading size={"md"}>{member.memberName}</Heading>
                    </Flex>
                    <Spacer />
                    <Box padding={4} onClick={() => {selectedMemberHandler(member)}}>
                        <AiOutlinePlus size={20} />
                    </Box>
                </Flex>
            )
    }

    function selectedMemberHandler(member: any) {
        setSelectedMember([...selectedMember,member])
        // console.log(selectedMember)
    }

    const renderSelectedMember = () => {
        return(
            selectedMember.map((e:any) => (
                <Box key={e.id} pb={4}>
                    <Avatar name={e.memberName} src={e.memberPic} />
                    {/* <AiOutlineMinus onClick={() => setSelectedMember(selectedMember.filter((e:any)=> e.id !== selectedMember.id))}/> */}
                </Box>
            ))
        )
    }

    const memberSearch = (search: String) => {}

    if (props === "Set room name") {
        return (
            <Box p={"6"}>
                <Input placeholder="Room name" />
            </Box>
        )
    }
    if (props === "Set nickname") {
        return (
            <VStack m={4} spacing={6}>
                <HStack spacing={4}>
                    <Avatar name="Nong neng" src="https://picsum.photos/200/300" />
                    <Flex direction={'column'}>
                        <Heading size={"md"}>Neng</Heading>
                        <Button variant={"ghost"} size={"sm"} width={"12"} fontWeight={"normal"}>
                            rename
                        </Button>
                    </Flex>
                </HStack>
                <HStack spacing={4}>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                    <Flex direction={'column'}>
                        <Heading size={"md"}>Dan</Heading>
                        <Button variant={"ghost"} size={"sm"} width={"12"} fontWeight={"normal"}>
                            rename
                        </Button>
                    </Flex>
                </HStack>
            </VStack>
        )
    }
    if (props === "Add quote") {
        return (
            <Flex justifyContent={"center"}>
                <VStack>
                    <Text>Quote you added</Text>
                    <Flex bg={"gray.200"} w={"96"} p={4} overflowY={'auto'} maxH={'60'}>
                        <UnorderedList>
                            <ListItem>Quote1</ListItem>
                            <ListItem>Quote2</ListItem>
                            <ListItem>Quote3</ListItem>
                            <ListItem>Quote4</ListItem>
                        </UnorderedList>
                    </Flex>
                    <Text>Quote you want to add</Text>
                    <Input placeholder="Quote" />
                </VStack>
            </Flex>
        )
    }
    if (props === "Change room color") {
        return (
            <Flex justifyContent={"center"}>
                <VStack spacing={6}>
                    <VStack>
                        <Flex alignItems={"center"} justifyContent={"space-between"} wrap={"wrap"} width={"80"}>
                            {colors.map((color) => (
                                <Box>
                                    <Button width={"16"} height={"16"} variant="ghost" onClick={() => setRoomColor(color)}>
                                        <FaCircle color={color} size={"40px"} />
                                    </Button>
                                </Box>
                            ))}
                        </Flex>
                    </VStack>
                    <VStack>
                        <Text as="b">color code</Text>
                        <Input placeholder="#000000" bgColor={roomColor} onChange={(e) => colorRoom(e)} />
                    </VStack>
                </VStack>
            </Flex>
        )
    }
    if (props === "Report") {
        return (
            <Flex justifyContent={"center"}>
                <VStack>
                    <AiFillBug size={"40px"} />
                    <Text>Context you require to report</Text>
                    <Input placeholder="Context" w={96} />
                    <Text>Reason for reporting</Text>
                    <Input placeholder="Reason" />
                </VStack>
            </Flex>
        )
    }
    if (props === "Member") {
        return (
            <VStack spacing={6}>
                <HStack spacing={4}>
                    <Avatar name="Nong neng" src="https://picsum.photos/200/300" />
                    <Heading size={"md"}>
                        <Editable defaultValue="Neng">
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </Heading>
                </HStack>
                <HStack spacing={4}>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                    <Heading size={"md"}>
                        <Editable defaultValue="Neng">
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </Heading>
                </HStack>
            </VStack>
        )
    }
    if (props === "Invite people") {
        return (
            <Flex justifyContent={"center"}>
                <Flex w={"96"} direction={"column"} gap={4}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
                        <Input placeholder="Search name or user id" borderColor={"black"} />
                    </InputGroup>
                    <Flex gap={4} overflowX={'auto'}>
                        {renderSelectedMember()}
                    </Flex>
                    <Box overflowY={"auto"} maxH={"60"}>
                        <Flex direction={"column"} gap={4}>
                            {members.map((e: any) => renderMember(e))}
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        )
    }
    if (props === "Set room profile") {
        return (
            <Flex justifyContent={"center"}>
                <VStack spacing={4}>
                <Image
                        borderRadius="full"
                        boxSize="150px"
                        src="https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
                        alt="Room profile"
                    />
                    <Button>Choose from my library</Button>
                </VStack>
            </Flex>
        )
    }
    if (props === "Create community") {
        return (
            <Flex justifyContent={"center"}>
                <Text textAlign={"center"}>
                    Are you sure that you want to create
                    <br />
                    community from this group chat?
                </Text>
            </Flex>
        )
    }
    if (props === "Leave group") {
        return (
            <Flex justifyContent={"center"}>
                <Text textAlign={"center"}>
                    If you leave this group, you'll not be able to see
                    <br />
                    the chat message and group anymore.
                    <br />
                    Are you sure you want to leave group?
                </Text>
            </Flex>
        )
    }
}

export default propertyDetail
