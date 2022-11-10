import { Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const ContentBox = (props: any) => {
    return (
        <Box bg="#f1f1f1" borderRadius="lg" shadow="md">
            {props.children}
        </Box>
    )
}

export default ContentBox
