import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import { GrClose } from "react-icons/gr"
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PostOnApproval from "../../../components/annoucement/PostOnApproval"

const index = () => {
    return (
        <AppBody>
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl">
                    <Link to={"/announcement"}>
                        <GrClose />
                    </Link>
                </Text>
                <Spacer />
                <Heading>Approval </Heading>
                <Spacer />
            </Flex>
            <PostOnApproval topic="Hello World" sender="SAMO-SIT" />
        </AppBody>
    )
}

export default index
