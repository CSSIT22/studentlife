import React, { FC } from "react"
import { Center, Text, Box, useMediaQuery } from "@chakra-ui/react"

const header: FC<{
    name: string
}> = ({ name }) => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    return (
        <div>
            <Box bg="#E67f45" w={"100%"} shadow={"lg"} h={isSmallerThan768 ? "120px" : ""}>
                <Center py={isSmallerThan768 ? "40px" : "60px"}>
                    <Text fontSize="3xl" fontWeight={"bold"} color="white">
                        {name}
                    </Text>
                </Center>
            </Box>
        </div>
    )
}

export default header
