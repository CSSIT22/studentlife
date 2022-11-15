import { Stack, Button, Box } from "@chakra-ui/react"
import React, { FC } from "react"
import { BiBluetooth } from "react-icons/bi"
import { Link } from "react-router-dom"

const ButtonForEvent: FC<{
    onOpen: Function
    cancel: Function
    status: string
}> = ({ onOpen, cancel, status }) => {
    const checkStatus = (status: string) => {
        if (status == "approve" || status == "disapprove") {
            return "Delete announcement"
        } else if (status == "waiting") {
            return "Edit announcement"
        } else if (status == "recover") {
            return "Recover announcement"
        } else {
            return ""
        }
    }
    const linkOrNot = (status: string) => {
        if (status == "waiting") {
            return (
                <Link to={"/announcement/create"}>
                    <Button onClick={() => onOpen()} height="3.5rem" width={"100%"} boxShadow="2xl" bg={"#E65300"} color="white">
                        {checkStatus(status)}
                    </Button>
                </Link>
            )
        } else {
            return (
                <Button onClick={() => onOpen()} height="3.5rem" width={"100%"} boxShadow="2xl" bg={"#E65300"} color="white">
                    {checkStatus(status)}
                </Button>
            )
        }
    }
    return (
        <Stack position={"fixed"} bottom="5rem" width={{ base: "91%", md: "96%" }} transition={"0.25s"}>
            {linkOrNot(status)}
            <Button onClick={() => cancel()} boxShadow="2xl">
                Close
            </Button>
        </Stack>
    )
}

export default ButtonForEvent
