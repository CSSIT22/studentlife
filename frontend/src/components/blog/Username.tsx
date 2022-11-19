import { Box, Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const UsernameAndTime: FC<{
    name: string
}> = ({ name }) => {
    return (
        <Button colorScheme="orange" variant="link">
            <Text fontSize="2xl">{name}</Text>
        </Button>
    )
}

export default UsernameAndTime
