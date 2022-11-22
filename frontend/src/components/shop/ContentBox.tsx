import { Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const ContentBox = (props: any) => {
    const animatedBox = (() =>
        <Box bg={props.bg ? props.bg : "#fff"} overflow = "hidden" borderRadius={props.br ? props.br : "xl"} shadow={props.sh ? props.sh : "md"} _hover={{ transform: "scale(1.05)" }} transitionDuration="300ms">
            {props.children}
        </Box>
    )
    const normalBox = (() =>
        <Box bg={props.bg ? props.bg : "#fff"} overflow = "hidden" borderRadius={props.br ? props.br : "xl"} shadow={props.sh ? props.sh : "md"}>
            {props.children}
        </Box>
    )

    if ( props.isAni == true) {
        return (animatedBox())
    }
    return (normalBox())
}

export default ContentBox
