import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Flex, Heading, Link } from "@chakra-ui/react"
import React from "react"
import AppBody from "src/components/share/app/AppBody"

const review = () => {
    return (
        <AppBody>
            <Flex mb={5} direction={"row"} alignItems={"center"}>
                <Link href="/shopreview/shopdetails">
                    <ChevronLeftIcon w={8} h={8} />
                </Link>
                <Heading>User Review!!!!</Heading>
            </Flex>
        </AppBody>
    )
}

export default review
