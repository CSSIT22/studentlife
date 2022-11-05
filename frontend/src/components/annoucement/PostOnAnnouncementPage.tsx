import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsPinAngle, BsPinAngleFill } from "react-icons/all"

const PostOnAnnouncementPage: FC<{
    topic: string
    sender: string
    status: boolean
}> = ({ topic, sender, status }) => {
    const state = (stat: boolean) => {
        if (stat) {
            return <BsPinAngleFill fontSize={"2rem"} />
        } else {
            return <BsPinAngle fontSize="2rem" />
        }
    }
    const [pin , setPin] = React.useState(status);

    return (
        <Box height={"5rem"} width={"100%"} p="5" mt="5" backgroundColor="#D9D9D9" rounded="lg" onClick={() => setPin(!pin)}>
            <Flex alignItems={"center"}>
                <Box>
                    <Heading size={"sm"}>{topic}</Heading>
                    <Text fontSize={"xs"}>{sender}</Text>
                </Box>
                <Spacer />
                <Box textAlign={"right"} pr={"1rem"} width="">
                    {state(pin)}
                </Box>
            </Flex>
        </Box>
    )
}

export default PostOnAnnouncementPage
