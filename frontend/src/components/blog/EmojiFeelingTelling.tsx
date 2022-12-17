import { Box, Button, Center, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const EmojiFeelingTelling: FC<{ number: number; emotion: string }> = ({ number, emotion }) => {
    return (
        <Box>
            <Button colorScheme="orange" size="lg" variant="outline">
                {number}
                {emotion}
            </Button>
        </Box>
    )
}

export default EmojiFeelingTelling
