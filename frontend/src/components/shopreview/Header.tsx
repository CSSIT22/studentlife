import { Box, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

const Header: FC<{
    name: String
    image: String
}> = ({ name, image }) => {
    return (
        <Box width={"100%"} padding={10} background={`url('${image}')`} rounded={"2xl"} shadow={"lg"}>
            <Heading textAlign={"center"} color="white">
                {name}
            </Heading>
        </Box>
    )
}

export default Header
