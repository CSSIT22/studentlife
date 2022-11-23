import { Button } from "@chakra-ui/react"
import React from "react"

const ThemedButton = (props: any) => {
    return (
        <Button
            colorScheme="orange"
            w={props.width ? props.width : "100%"}
            maxW={props.maxW ? props.maxW : "none"}
            shadow="lg"
            onClick={props.onClick ? props.onClick : undefined}
        >
            {" "}
            {props.children}
        </Button>
    )
}

export default ThemedButton
