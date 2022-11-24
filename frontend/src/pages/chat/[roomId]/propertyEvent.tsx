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
    InputRightElement,
} from "@chakra-ui/react"
import AppBody from "../../../components/share/app/AppBody"
import React, { useState } from "react"
import { AiFillBug, AiFillPicture, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { FaCircle } from "react-icons/fa"
import { SearchIcon } from "@chakra-ui/icons"
import API from "src/function/API"
import Member from "src/pages/groups/id/[communityID]/member"

const propertyDetail = (props: any) => {
    return <Box>{propertyEvent(props)}</Box>
}

function propertyEvent(props: any) {
    const [roomColor, setRoomColor] = React.useState("")
    const colors = ["black", "blue", "gray", "red", "green", "purple", "pink", "orange", "teal", "yellow"]

    function colorRoom(e: any) {
        return setRoomColor(e.target.value)
    }

    const [roomName, setRoomName] = useState("")
    const submitRoomName = () => {
        API.post("/chat")
    }

    type member = { memberPic:String , memberName:String , id: String}

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
    
    const renderMember = (member: any ) => {
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

    const quote = ["I wish I was your mirror, so that I could look at you every morning.",
                    "When I need a pick me up, I just think of your laugh and it makes me smile.",
                    "You know you're pretty… pretty amazing.",
                    "I'm lucky because I have plans for today, for tomorrow, for the week, and for my whole life—to make you happy."]

    const [quoteList, setQuote ] = useState(quote)
    const [quoteText, setQuoteText] = useState("")
    const [quoteWarning,setQuoteWarning] = useState("")

    const addQuote = () => {
        if(quoteText.length !== 0){
            setQuote([...quoteList , quoteText])
            setQuoteText("")
            setQuoteWarning("")
        }
        else if(quoteText.length == 0){
            setQuoteWarning("Your input is empty! Please add the quote.")
        }
    }

    const memberSearch = (search: String) => { }

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
                    <Flex direction={"column"}>
                        <Heading size={"md"}>Neng</Heading>
                        <Button variant={"ghost"} size={"sm"} width={"12"} fontWeight={"normal"}>
                            rename
                        </Button>
                    </Flex>
                </HStack>
                <HStack spacing={4}>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                    <Flex direction={"column"}>
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
                    <Flex bg={"gray.200"} w={"96"} p={4} overflowY={"auto"} maxH={"60"}>
                        <UnorderedList>
                            {quoteList.map((e:any) =>(
                                <ListItem>{e}</ListItem>
                            ))}
                        </UnorderedList>
                    </Flex>
                    <Text pt={4}>Quote you want to add</Text>
                    <InputGroup>
                        <Input placeholder="Quote" value={quoteText} onChange={(e) => setQuoteText(e.target.value)}/>
                        <InputRightElement>
                            <Box onClick={()=> addQuote()} color="orange.200" cursor={'pointer'}><AiOutlinePlus size={20} /></Box>
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
