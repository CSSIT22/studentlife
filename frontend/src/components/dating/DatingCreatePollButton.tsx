import { Button, Center, Circle } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import React from "react"
import { BsPencil } from "react-icons/bs"

const DatingCreatePollButton = () => {
    return (
        <Link to="/dating/poll/create" style={{ textDecoration: "none" }}>
            <Circle size="50px" bgColor="#E65300" boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                <Center>
                    <BsPencil size="25px" color="white" />
                </Center>
            </Circle>
        </Link>
    )
}

export default DatingCreatePollButton
