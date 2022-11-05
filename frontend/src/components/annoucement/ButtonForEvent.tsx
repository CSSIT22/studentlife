import { Stack, Button } from "@chakra-ui/react"
import React, { FC } from "react"

const ButtonForEvent:FC<{
    onOpen:Function,
    cancel:Function,
    status:string
}> = ({onOpen,cancel,status}) => {
    const checkStatus = (status:string) => {
        if(status == 'approve' || status == 'disapprove'){
            return "Delete announcement"
        }else if(status == 'waiting'){
            return "Edit announcement"
        }
    }
    return (
        <Stack position={"fixed"} bottom="5rem" width="91%" transition={"0.25s"}>
            <Button onClick={() => onOpen()} height="3.5rem">
               {checkStatus(status)}
            </Button>
            <Button onClick={() => cancel()}>Close</Button>
        </Stack>
    )
}

export default ButtonForEvent
