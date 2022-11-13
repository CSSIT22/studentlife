import React, { FC } from "react"
import { Center, Heading, Text, Box } from "@chakra-ui/react"

const header: FC<{
    header: string
}> = ({ header }) => {
    return (
        <div>
            <Box bg="orange.400" w={"100%"} m="0">
                <Center py="60px">
                    <Text fontSize="3xl" fontWeight={"bold"} color="white">
                        {header}
                    </Text>
                </Center>
            </Box>
        </div>
    )
}

export default header
