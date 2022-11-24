import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const AmountRate: FC<{
    ratting: String
}> = ({ ratting }) => {
    return (
        <Box p={1} minWidth={"60px"} maxWidth={"80px"} height={"25px"} px={2} rounded={"2xl"} background={"#E68E5C"}>
            <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <img
                    style={{ maxWidth: 14 }}
                    src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                ></img>
                <Text ml={1} as={"b"} fontSize={"xs"} color="white">
                    {ratting}/5
                </Text>
            </Flex>
        </Box>
    )
}

export default AmountRate
