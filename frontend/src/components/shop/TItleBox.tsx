import { Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const TitleBox: FC<{
    title: string
}> = ({ title }) => {
    return (
        <Box bg="#f1f1f1" borderRadius="lg" shadow="md">
            <Text px="5" py="1.5"  fontWeight="bold" fontSize="lg"> {title} </Text>
        </Box>
    )
}

export default TitleBox
