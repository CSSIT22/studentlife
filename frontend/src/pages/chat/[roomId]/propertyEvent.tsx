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
    InputGroup,
    InputLeftElement,
    Spacer,
    ListItem,
    UnorderedList,
    Image,
    Editable,
    EditablePreview,
    EditableInput,
    InputRightElement,
} from "@chakra-ui/react"
import AppBody from "../../../components/share/app/AppBody"
import React, { useEffect, useState } from "react"
import { AiFillBug, AiOutlinePlus } from "react-icons/ai"
import { FaCircle } from "react-icons/fa"
import { SearchIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { RoomType } from "../[roomID]"
import { buffer_to_img } from "src/components/chat/function/64_to_img"

const propertyDetail = (props: any) => {
    return <Box>{propertyEvent(props)}</Box>
}

export type memberType = {
    roomId: string,
    joined: string,
    lefted: string,
    user: {
        userId: string,
        fName: string,
        lName: string,
        image: {
            type: string,
            data: string
        } | null
    }
}

function propertyEvent(props: any) {
    const [Room, setRoom] = React.useState<RoomType>()
    const [member, setMember] = React.useState<memberType>()

    // Change color
    const [roomColor, setRoomColor] = React.useState("")
    const colors = ["#000000", "#AEC6CF", "#808080", "#ff6961", "#C1E1C1", "#C3B1E1", "#ffc0cb", "#E68E5C", "#88aed0", "#FDFD96"]
    function colorRoom(e: any) {
        return setRoomColor(e.target.value)
    }
    const submitRoomColor = () => {
        if (Room?.roomType === "INDIVIDUAL") {
            API.put(`/chat/${param.roomId}?chatColor=${encodeURIComponent(roomColor)}`)
        }
        if (Room?.roomType === "GROUP") {
            API.put(`/chat/${param.roomId}/editGroup?chatColor=${encodeURIComponent(roomColor)}`)
        }
        navigate(`/chat/${param.roomId}`)
    }

    let param = useParams()
    useEffect(() => {
        API.get(`/chat/${param.roomId}`).then((e) => setRoom(e.data)
        )
    }, [param])

    useEffect(() => {
        API.get(`/chat/${param.roomId}/getMember`).then((e) => setMember(e.data)
        )
    }, [param])
    const renderMemberGroup = (element: any) => {
        return (
            element.map((e: memberType) => {
                const img = e.user.image
                return (
                    <HStack spacing={4} onClick={() => navigate(`/user/${e.user.userId}`)} cursor={'pointer'}>
                        <Avatar name={e.user.fName} src={(img === null) ? "" : buffer_to_img(img?.data)} />
                        <Heading size={"md"}>
                            {e.user.fName} {e.user.lName}
                        </Heading>
                    </HStack>
                )
            })
        )
    }

    const navigate = useNavigate()

    function NavigateCreateCommu() {
        return navigate('/groups/create')
    }

    // Set room name
    const [roomName, setRoomName] = useState("")
    const submitRoomName = () => {
        if (Room?.roomType === "INDIVIDUAL") {
            API.put(`/chat/${param.roomId}?roomName=${roomName}`)
        }
        if (Room?.roomType === "GROUP") {
            API.put(`/chat/${param.roomId}/editGroup?roomName=${roomName}`)
        }
        navigate(`/chat/${param.roomId}`)
    }

    const members: any = [
        { memberPic: "https://picsum.photos/200/300", memberName: "Neng", id: "1" },
        { memberPic: "https://picsum.photos/200/300", memberName: "Gift", id: "2" },
        { memberPic: "https://picsum.photos/200/300", memberName: "Oil", id: "3" },
        { memberPic: "https://picsum.photos/200/300", memberName: "Tine", id: "4" },
        { memberPic: "https://picsum.photos/200/300", memberName: "Parn", id: "5" },
        { memberPic: "https://picsum.photos/200/300", memberName: "Dolly", id: "6" },
    ]

    const [selectedMember, setSelectedMember] = useState<any>([])
    const [searchMember, setSearchMember] = React.useState("")

    const renderMember = (member: any) => {
        // if(selectedMember.length != 0){
        //     member.filter((e: any) => e.id == selectedMember.includes(e.id))
        //     console.log(selectedMember);
        // }
        return (
            <Flex justifyContent={"space-between"} alignItems={"center"} key={member.id}>
                <Flex alignItems={"center"}>
                    <Avatar name={member.memberName} src={member.memberPic} marginRight={4} />
                    <Heading size={"md"}>{member.memberName}</Heading>
                </Flex>
                <Spacer />
                <Box padding={4} onClick={() => { selectedMemberHandler(member) }}>
                    <AiOutlinePlus size={20} />
                </Box>
            </Flex>
        )
    }

    const renderSearchMember = (searchMember: any) => {
        if (searchMember === "") {
            return (
                members.map((e: any) => renderMember(e))
            )
        }
        else {
            const result = members.filter((e: any) => e.memberName.includes(searchMember))
            return result.map((e: any) => renderMember(e))
        }
    }

    function selectedMemberHandler(member: any) {
        setSelectedMember([...selectedMember, member])
        // console.log(selectedMember)
    }

    const renderSelectedMember = () => {
        // Coding if select that member, they won't render up
        return (
            selectedMember.map((e: any) => (
                <Box key={e.id} pb={4}>
                    <Flex direction={'column'} alignItems={'center'}>
                        <Avatar name={e.memberName} src={e.memberPic} />
                        <Box>{e.memberName}</Box>
                    </Flex>
                    {/* <AiOutlineMinus onClick={() => setSelectedMember(selectedMember.filter((e:any)=> e.id !== selectedMember.id))}/> */}
                </Box>
            ))
        )
    }

    // Add quote
    const [quoteList, setQuote] = useState<any>([])
    const [quoteText, setQuoteText] = useState("")
    const [quoteWarning, setQuoteWarning] = useState("")
    useEffect(() => {
        API.get(`/chat/${param.roomId}/getQuote`).then((e) => setQuote(e.data)
        )
    }, [])
    const addQuote = () => {
        if (quoteText.length !== 0) {
            setQuote([...quoteList, { text: quoteText }])
            API.post(`/chat/${param.roomId}/addQuote?quoteAdd=${quoteText}`)
            setQuoteText("")
            setQuoteWarning("")
        }
        else if (quoteText.length == 0) {
            setQuoteWarning("Your input is empty! Please add the quote.")
        }
    }


    // Leave group
    const leaveGroup = () => {
        API.delete(`/chat/${param.roomId}/leaveGroup`)
        navigate(`/chat`)
    }

    if (props === "Set room name") {
        if (Room?.roomType == 'INDIVIDUAL') {
            return (
                <VStack spacing={4} p={4}>
                    <Input placeholder={Room?.nickname} onChange={(e: any) => setRoomName(e.target.value)} />
                    <Box alignItems={'center'}>
                        <Button colorScheme="orange" onClick={submitRoomName}>
                            Done
                        </Button>
                    </Box>
                </VStack>
            )
        }
        if (Room?.roomType == 'GROUP') {
            return (
                <VStack spacing={4} p={4}>
                    <Input placeholder={Room?.group.roomName} onChange={(e: any) => setRoomName(e.target.value)} />
                    <Box alignItems={'center'}>
                        <Button colorScheme="orange" onClick={submitRoomName}>
                            Done
                        </Button>
                    </Box>
                </VStack>
            )
        }
    }

    if (props === "Add quote") {
        return (
            <Flex justifyContent={"center"} pb={6}>
                <VStack>
                    <Text>Quote you added</Text>
                    <Flex bg={"gray.100"} w={"96"} p={4} overflowY={"auto"} maxH={"60"} rounded={'md'}>
                        <UnorderedList>
                            {quoteList.map((e: any) => (
                                <ListItem>{e.text}</ListItem>
                            ))}
                        </UnorderedList>
                    </Flex>
                    <Text pt={4}>Quote you want to add</Text>
                    <InputGroup>
                        <Input placeholder="Quote" value={quoteText} onChange={(e) => setQuoteText(e.target.value)} />
                        <InputRightElement>
                            <Box onClick={() => addQuote()} color="orange.200" cursor={'pointer'}><AiOutlinePlus size={20} /></Box>
                        </InputRightElement>
                    </InputGroup>
                    <Box color="red" fontSize={12}>{quoteWarning}</Box>
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
                        <Input placeholder={Room?.chatColor} bgColor={roomColor} onChange={(e) => colorRoom(e)} />
                    </VStack>
                    <Button colorScheme="orange" onClick={submitRoomColor}>
                        Done
                    </Button>
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
                    <Box alignItems={'center'} p={6}>
                        <Button colorScheme="green">
                            Verify and send
                        </Button>
                    </Box>
                </VStack>
            </Flex>
        )
    }
    if (props === "Member") {
        return (
            <Flex direction={'column'} alignItems={'flex-start'} gap={5} pb={6} px={'12'} overflowY={"auto"} maxH={'80'}>
                {renderMemberGroup(member)}
            </Flex>
        )
    }
    if (props === "Invite people") {
        return (
            <VStack>
                <Flex w={"96"} direction={"column"} gap={4}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
                        <Input placeholder="Search name or user id" borderColor={"black"} onChange={(e) => setSearchMember(e.target.value)} />
                    </InputGroup>
                    <Flex gap={4} overflowX={"auto"}>
                        {renderSelectedMember()}
                    </Flex>
                    <Box overflowY={"auto"} maxH={"60"}>
                        <Flex direction={"column"} gap={4}>
                            {renderSearchMember(searchMember)}
                            {/* {members.map((e: any) => renderMember(e))} */}
                        </Flex>
                    </Box>
                </Flex>
                <Box alignItems={'center'} p={6}>
                    <Button colorScheme="orange">
                        Invite
                    </Button>
                </Box>
            </VStack>
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
                    <Box alignItems={'center'} p={3}>
                        <Button colorScheme="orange">
                            Done
                        </Button>
                    </Box>
                </VStack>
            </Flex>
        )
    }
    if (props === "Create community") {
        return (
            <VStack justifyContent={"center"}>
                <Text textAlign={"center"}>
                    Are you sure that you want to create
                    <br />
                    community from this group chat?
                </Text>
                <Box alignItems={'center'} p={6} onClick={NavigateCreateCommu}>
                    <Button colorScheme="orange">
                        Create
                    </Button>
                </Box>
            </VStack>
        )
    }
    if (props === "Leave group") {
        return (
            <VStack justifyContent={"center"}>
                <Text textAlign={"center"}>
                    If you leave this group, you'll not be able to see
                    <br />
                    the chat message and group anymore.
                    <br />
                    Are you sure you want to leave group?
                </Text>
                <Box alignItems={'center'} p={6}>
                    <Button colorScheme="orange" onClick={leaveGroup}>
                        Leave group
                    </Button>
                </Box>
            </VStack>
        )
    }
}

export default propertyDetail
