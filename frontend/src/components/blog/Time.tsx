import React, { FC } from "react"
import { Box, Button, Text } from "@chakra-ui/react"

const Time: FC<{ date: number; month: number; year: number }> = ({ date, month, year }) => {
    return (
        <Text color="gray" fontSize="xl">
            {date}/{month}/{year}
        </Text>
    )
}

export default Time
