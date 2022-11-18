import { Button, Center, Circle } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import React from "react"
import { BsPencil } from "react-icons/bs"

const DatingCreatePollButton = () => {
    return (
        <Circle size="50px" bgColor="#E65300">
            <Link to="/dating/poll/create" style={{ textDecoration: "none" }}>
                <Center>
                    <BsPencil size="25px" color="white" />
                </Center>
            </Link>
        </Circle>
    )
}

export default DatingCreatePollButton
