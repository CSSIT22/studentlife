import { Flex, Heading, Spacer, Box, Text, Button } from "@chakra-ui/react"
import React, { FC } from "react"
import { HiCheckCircle, HiXCircle } from "react-icons/hi"
import { TbLoader } from "react-icons/tb"

const PostOnHistory: FC<{
    topic: string
    sender: string
    status: string
    onClick: Function
    id: number
    onOpen: Function
}> = ({ topic, sender, status, onClick, id, onOpen }) => {
    const state = (stat: string) => {
        if (stat == "approve") {
            return <HiCheckCircle fontSize={"2rem"} color="#38A169" />
        } else if (stat == "disapprove") {
            return <HiXCircle fontSize={"2rem"} color="#E53E3E" />
        } else if (stat == "waiting") {
            return <TbLoader fontSize={"2rem"} color="#CC4900" />
        }
    }
    const button = (status: string) => {
        if (status == "approve" || status == "disapprove") {
            return (
                <Button fontSize={"0.7rem"} bg="#E53E3E" color="white" as={"b"}>
                    DELETE
                </Button>
            )
        } else if (status == "waiting") {
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
        >
            <Flex alignItems={"center"}>
                <Box pr={"1rem"} width="">
                    {state(status)}
                </Box>
                <Box>
                    <Heading size={"sm"}>{topic}</Heading>
                    <Text fontSize={"xs"}>{sender}</Text>
                </Box>
                <Spacer />
                <Box>{button(status)}</Box>
            </Flex>
        </Box>
    )
}

export default PostOnHistory
