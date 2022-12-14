import { Flex, Heading, Spacer, Box, Text, Button } from "@chakra-ui/react"
import React, { FC } from "react"
import { HiCheckCircle, HiXCircle } from "react-icons/hi"
import { TbLoader } from "react-icons/tb"

const PostOnHistory: FC<{
    topic: string
    sender: string
    status: string
    onClick: Function
    id: string
    onOpen: Function
}> = ({ topic, sender, status, onClick, id, onOpen }) => {
    const state = (stat: string) => {
        if (stat == "Approve") {
            return <HiCheckCircle fontSize={"2rem"} color="#38A169" />
        } else if (stat == "Disapprove") {
            return <HiXCircle fontSize={"2rem"} color="#E53E3E" />
        } else if (stat == "Waiting for Approve") {
            return <TbLoader fontSize={"2rem"} color="#CC4900" />
        }
    }
    const button = (status: string) => {
        if (status == "Approve" || status == "Disapprove") {
            return (
                <Button fontSize={"0.7rem"} bg="#E53E3E" color="white" as={"b"}>
                    DELETE
                </Button>
            )
        } else if (status == "Waiting for Approve") {
            return (
                <Button fontSize={"0.7rem"} bg="#293B66" color="white" as={"b"}>
                    EDIT
                </Button>
            )
        }
    }
    return (
        <Box
            height={"5rem"}
            width={"100%"}
            p="5"
            mt="5"
            backgroundColor="white"
            rounded="lg"
            onClick={() => {
                onClick(status, id), onOpen()
            }}
            boxShadow="md"
            cursor={"pointer"}
            _hover={{backgroundColor:"rgb(243 244 246)"}}
        >
            <Flex alignItems={"center"}>
                <Box pr={"1rem"} width="">
                    {state(status)}
                </Box>
                <Box>
                    <Heading size={"sm"}>{topic.substring(0, 20)}</Heading>
                    <Text fontSize={"xs"}>{sender}</Text>
                </Box>
                <Spacer />
                <Box>{button(status)}</Box>
            </Flex>
        </Box>
    )
}

export default PostOnHistory
