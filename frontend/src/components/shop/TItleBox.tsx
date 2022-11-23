import { Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const TitleBox: FC<{
    title: string
    sh?: string
}> = ({ title, sh }) => {
    return (
        <Box bg="#fff" borderRadius="lg" shadow={sh ? sh : "lg"} border="#Fafafa solid 1px">
            <Text px="5" py="1.5" fontWeight="bold" fontSize="lg">
                {" "}
                {title}{" "}
            </Text>
        </Box>
    )
}

export default TitleBox
