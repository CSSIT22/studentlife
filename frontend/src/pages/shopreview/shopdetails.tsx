import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Flex, Heading, Link, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import Myreview from "src/components/shopreview/Myreview"
import AppBody from "../../components/share/app/AppBody"
import DetailBox from "../../components/shopreview/DetailBox"
import MentDetail from "../../components/shopreview/ReviewDetail"
import ShopName from "../../components/shopreview/ShopName"

const shopdetails = () => {
    return (
        <AppBody>
            <Flex mb={5} direction={"row"} alignItems={"center"}>
                <Link href="/shopreview">
                    <ChevronLeftIcon w={8} h={8} />
                </Link>
                <Heading>Shop detail!!</Heading>
            </Flex>
        </AppBody>
    )
}

export default shopdetails
