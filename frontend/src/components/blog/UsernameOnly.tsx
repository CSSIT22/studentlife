import { Box, Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const UsernameOnly: FC<{
    name: string
}> = ({ name }) => {
    return (
        <Button colorScheme="orange" variant="link" isDisabled>
            <Text fontSize="2xl">{name}</Text>
        </Button>
    )
}

export default UsernameOnly
