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
    InputRightElement,
    Select,
} from "@chakra-ui/react"
import AppBody from "../../../components/share/app/AppBody"
import React, { useEffect, useState } from "react"
import { AiFillBug, AiOutlinePlus } from "react-icons/ai"
import { FaCircle } from "react-icons/fa"
import { SearchIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import { useNavigate, useParams } from "react-router-dom"
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
    const [member, setMember] = React.useState<memberType[]>()
    const [roomName, setRoomName] = React.useState("")
    const [roomColor, setRoomColor] = React.useState("")
    const [followList, setFollowList] = React.useState<followType[]>([])
    const [searchMember, setSearchMember] = React.useState("")
    const [reportContext, setReportContext] = React.useState("")
    const [reportReason, setReportReason] = React.useState("")

    const navigate = useNavigate()
    let param = useParams()
    useEffect(() => {
        API.get(`/chat/${param.roomId}`).then((e) => setRoom(e.data))
        API.get(`/chat/${param.roomId}/getMember`).then((e) => setMember(e.data))
        API.get(`/chat/${param.roomId}/getFollowList`).then((e) => setFollowList(e.data))
    }, [param])

    // Change color
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

    // Set room name
    const submitRoomName = () => {
        if (Room?.roomType === "INDIVIDUAL") {
            API.put(`/chat/${param.roomId}?roomName=${roomName}`)
        }
        if (Room?.roomType === "GROUP") {
            API.put(`/chat/${param.roomId}/editGroup?roomName=${roomName}`)
        }
        navigate(`/chat/${param.roomId}`)
    }

    // Invite
    type followType = {
        following: {
            userId: String,
            fName: String,
            image: {
                type: string,
                data: string
            } | null
        }
    }

    const renderMemberInvite = (members: any) => {
        const img = members.following.image

        return (
            <Flex justifyContent={"space-between"} alignItems={"center"} key={members.following.userId}>
                <Flex alignItems={"center"}>
                    <Avatar name={members.following.fName} src={(img === null) ? "" : buffer_to_img(img?.data)} marginRight={4} />
                    {/* <Heading size={"md"}>{member.memberName}</Heading> */}
                    <Heading size={"md"}>{members.following.fName}</Heading>
                </Flex>
                <Spacer />
                <Box>
                    <Button colorScheme={'orange'} onClick={() => inviteMember(members.following.userId)}>Invite</Button>
                </Box>
            </Flex>
        )
    }

    const inviteMember = (memberId: any) => {
        API.post(`/chat/${param.roomId}/inviteToGroup`, { target_id: memberId })
        const result = followList.filter((e)=> e.following.userId != memberId)
        setFollowList(result)
    }

    const renderSearchMember = (searchMember: any) => {
        const result = followList.filter((e) => !member?.some((f)=>f.user.userId == e.following.userId))

        if (searchMember === "") {
            return (
                result.map((e: any) => renderMemberInvite(e))
            )
        }
        else {
            const resultSearch = result.filter((e: any) => e.following.fName.includes(searchMember))
            return resultSearch.map((e: any) => renderMemberInvite(e))
        }
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

    // Report
    const sendReport = () => {
        API.post("/backendService/reportword", { word: reportContext, roomId: param.roomId, reason: reportReason }).then(() => console.log("success")
        )
        setReportContext("")
        setReportReason("")
    }

    // Leave group
    const leaveGroup = () => {
        API.delete(`/chat/${param.roomId}/leaveGroup`)
        navigate(`/chat`)
    }

    if (props === "Set room name") {
        if (Room?.roomType === 'INDIVIDUAL') {
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
        if (Room?.roomType === 'GROUP') {
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
                    <Input placeholder="Context" w={96} onChange={(e) => setReportContext(e.target.value)} />
                    <Text>Reason for reporting</Text>
                    <Select placeholder="Reason" onChange={(e) => setReportReason(e.target.value)}>
                        <option value="bully">Bully</option>
                        <option value="Toxic">Toxic</option>
                        <option value="Harassment">Harassment</option>
                        <option value="I don't like this word">I don't like this word</option>
                    </Select>
                    <Box alignItems={'center'} p={6}>
                        <Button colorScheme="green" onClick={() => sendReport()}>
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
                <Flex w={"96"} direction={"column"} gap={4} pb='6'>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
                        <Input placeholder="Search name" borderColor={"black"} onChange={(e) => setSearchMember(e.target.value)} />
                    </InputGroup>
                    {/* <Flex gap={4} overflowX={"auto"}>
                        {renderSelectedMember()}
                    </Flex> */}
                    <Box overflowY={"auto"} maxH={"60"}>
                        <Flex direction={"column"} gap={4}>
                            {renderSearchMember(searchMember)}
                            {/* {members.map((e: any) => renderMember(e))} */}
                        </Flex>
                    </Box>
                </Flex>
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
