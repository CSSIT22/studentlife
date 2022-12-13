import { Button, Center, Circle, useBreakpointValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import React from "react"
import { BsPencil } from "react-icons/bs"

const DatingCreatePollButton = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    return (
        <Link to="/dating/poll/create" style={{ textDecoration: "none" }}>
            <Circle size={{ base: "50px", md: "75px" }} bgColor="#E65300" boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
                <Center>
                    {isMobile ? <BsPencil size="40px" color="white" /> : <BsPencil size="20px" color="white" />}
                </Center>
            </Circle>
        </Link>
    )
}

export default DatingCreatePollButton
