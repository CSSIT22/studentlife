import { Flex, Spacer, Heading, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { GrClose } from "react-icons/gr"

const HeaderPage: FC<{
    head: string
}> = ({ head }) => {
    return (
        <Flex alignItems={"center"}>
            <Text as={"b"} fontSize="xl">
                <GrClose />
            </Text>
            <Spacer />
            <Heading>{head}</Heading>
            <Spacer />
            <Box></Box>
        </Flex>
    )
}

export default HeaderPage
