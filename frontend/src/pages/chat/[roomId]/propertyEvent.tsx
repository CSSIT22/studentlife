import { Avatar, Box, Button, Heading, HStack, Input, useDisclosure, VStack, Text, Flex, Center } from "@chakra-ui/react"
import AppBody from "../../../components/share/app/AppBody"
import React from "react"
import { AiFillBug, AiFillPicture, AiOutlinePlus } from "react-icons/ai"
import { FaCircle } from "react-icons/fa"

const propertyDetail = (props: any) => {
    return <Box>{propertyEvent(props)}</Box>
}

function propertyEvent(props: any) {
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
                    <Avatar name="Nong neng" src="https://s.thistine.com/dog" />
                    <VStack spacing={1}>
                        <Heading size={"md"}>Neng</Heading>
                        <Text>rename</Text>
                    </VStack>
                </HStack>
                <HStack spacing={4}>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                    <VStack spacing={1}>
                        <Heading size={"md"}>Dan</Heading>
                        <Text>rename</Text>
                    </VStack>
                </HStack>
            </VStack>
        )
    }
    if (props === "Add quote") {
        return (
            <Flex justifyContent={"center"}>
                <VStack>
                    <Text>Quote you added</Text>
                    <Box bg={"gray.200"} w={"96"} p={4}>
                        Quote 1
                        <br />
                        Quote 2
                        <br />
                        Quote 3
                        <br />
                        Quote 4
                        <br />
                        Quote 5
                    </Box>
                    <Text>Quote you want to add</Text>
                    <Input placeholder="Quote" />
                </VStack>
            </Flex>
        )
    }
    if (props === "Change room color") {
        return (
            <Flex justifyContent={"center"}>
                <VStack>
                    <HStack spacing={4}>
                        <FaCircle color="red" />
                        <FaCircle color="green" />
                        <FaCircle color="blue" />
                    </HStack>
                    <Text>color code</Text>
                    <Input placeholder="#000000" />
                </VStack>
            </Flex>
        )
    }
    if (props === "Report") {
        return (
            <Flex justifyContent={"center"}>
                <VStack>
                    <AiFillBug />
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
            <VStack m={4} spacing={6}>
                <HStack spacing={4}>
                    <Avatar name="Nong neng" src="https://s.thistine.com/dog" />
                    <Heading size={"md"}>Neng</Heading>
                </HStack>
                <HStack spacing={4}>
                    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Heading size={"md"}>Dan</Heading>
                </HStack>
            </VStack>
        )
    }
    if (props === "Invite people") {
        return (
            <Flex justifyContent={'space-between'}>
                <Box bg={"gray.200"} w={"96"} p={4}>
                    <Input placeholder="Search name or user id" borderColor={'black'}/>
                    <VStack p={4} justifyContent={'flex-start'}>
                        <HStack spacing={4}>
                            <Avatar name="Nong neng" src="https://s.thistine.com/dog" />
                            <Heading size={"md"}>Neng</Heading>
                            <AiOutlinePlus />
                        </HStack>
                        <HStack spacing={4}>
                            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                            <Heading size={"md"}>Dan</Heading>
                            <AiOutlinePlus />
                        </HStack>
                    </VStack>
                </Box>
            </Flex>
        )
    }
    if (props === "Set room profile") {
        return (
            <Flex justifyContent={"center"}>
                <VStack spacing={4}>
                    <AiFillPicture />
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
                    if you leave this group, you'll not be able to see 
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
