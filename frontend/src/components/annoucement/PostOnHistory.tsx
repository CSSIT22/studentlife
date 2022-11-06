import { Flex, Heading, Spacer, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { HiCheckCircle, HiXCircle } from "react-icons/hi"
import { TbLoader } from "react-icons/tb"

const PostOnHistory: FC<{
    topic: string
    sender: string
    status: string,
    onClick:Function,
    id: number
    onSelectPost: Function
}> = ({ topic, sender, status ,onClick,id,onSelectPost}) => {
    
    const state = (stat: string) => {
        if (stat == "approve") {
            return <HiCheckCircle fontSize={"2rem"} />
        } else if (stat == "disapprove") {
            return <HiXCircle fontSize={"2rem"} />
        } else if(stat == 'waiting'){
            return <TbLoader fontSize={"2rem"} />
        }
    }
    const button =(status:string) =>{
        if (status == "approve" || status == 'disapprove') {
            return "DELETE"
        } else if(status == 'waiting'){
            return "EDIT"
        }
    }
    return (
        <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#D9D9D9" rounded="lg" onClick={() => onClick(status,id)}>
            <Flex alignItems={"center"}>
                <Box pr={"1rem"} width="">
                    {state(status)}
                </Box>
                <Box>
                    <Heading size={"sm"}>{topic}</Heading>
                    <Text fontSize={"xs"}>{sender}</Text>
                </Box>
            <Spacer/>
                <Box>
                    <Box backgroundColor={"gray.400"} p="2" rounded={"md"} width="4rem" textAlign={"center"}><Text fontSize={"0.7rem"}>{button(status)}</Text></Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default PostOnHistory
