import { Stack, Button } from "@chakra-ui/react"
import React, { FC } from "react"

const ButtonForEvent:FC<{
    onOpen:Function,
    cancel:Function,
    button:string
}> = ({onOpen,cancel,button}) => {
    return (
        <Stack position={"fixed"} bottom="5rem" width="91%">
            <Button onClick={() => onOpen()} height="3.5rem">
               {button}
            </Button>
            <Button onClick={() => cancel()}>Cancel</Button>
        </Stack>
    )
}

export default ButtonForEvent
