import React, { FC } from "react"
import { Box, Button, Text } from "@chakra-ui/react"

const Time: FC<{ date: Date }> = ({ date }) => {
    return (
        <Text color="gray" fontSize="xl">
            <>
                {date.toLocaleString() + ""}
            </>
        </Text>

    )
}

export default Time

