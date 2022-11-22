import { Avatar, Box, Center, Stack, Text, useMediaQuery } from "@chakra-ui/react"
import React, { FC } from "react"

const Userinfo: FC<{
    id: string
    email: string
}> = ({ id, email }) => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    return (
        <div>
            <Box bg="#fff2e5" borderRadius="10px" shadow={"lg"}>
                <Center p="10px">
                    <Stack direction={"row"} spacing={5}>
                        <Avatar src="https://bit.ly/broken-link" size="lg" />
                        <Stack>
                            <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black">
                                USER ID: {id}
                            </Text>
                            <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black">
                                EMAIL: {email}
                            </Text>
                        </Stack>
                    </Stack>
                </Center>
            </Box>
        </div>
    )
}

export default Userinfo
