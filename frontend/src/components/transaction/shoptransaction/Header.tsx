import React, { FC } from "react"
import { Center, Text, Box } from "@chakra-ui/react"

const header: FC<{
    name: string
}> = ({ name }) => {
    return (
        <div>
            <Box bg="#E67f45" w={"100%"} shadow={"lg"}>
                <Center py="60px">
                    <Text fontSize="3xl" fontWeight={"bold"} color="white">
                        {name}
                    </Text>
                </Center>
            </Box>
        </div>
    )
}

export default header
