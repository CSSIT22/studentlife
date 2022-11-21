import { Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const ContentBox = (props: any) => {
    return (
        <Box bg={props.bg ? props.bg : "#f1f1f1"} borderRadius={props.br ? props.br : "xl"} shadow={props.sh ? props.sh : "md"}>
            {props.children}
        </Box>
    )
}

export default ContentBox
