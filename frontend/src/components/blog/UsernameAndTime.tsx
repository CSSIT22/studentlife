import { Box, Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const UsernameAndTime: FC<{
    name: string
    date: number
    month: number
    year: number
}> = ({ name, date, month, year }) => {
    return (
        <Box marginLeft={"4"}>
            <Button colorScheme="orange" variant="link">
                <Text fontSize="2xl">{name}</Text>
            </Button>

            <Text color="gray" fontSize="xl">
                {date}/{month}/{year}
            </Text>
        </Box>
    )
}

export default UsernameAndTime
