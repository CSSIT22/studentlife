import { Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const PostText: FC<{
    text: string
}> = ({ text }) => {
    return (
        <Box marginTop={4}>
            <Text noOfLines={15} fontSize="20px">
                {text}
            </Text>
        </Box>
    )
}

export default PostText
