import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Avatar, Box, Center, Flex, Heading, Link, Stack } from "@chakra-ui/react"
import React, { FC } from "react"
import DetailBox from "../../components/shopreview/DetailBox"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"

const ShopDeatailName: FC<{
    name: String
}> = ({ name }) => {
    return (
        <Flex mb={5} direction={"row"} alignItems={"center"}>
            <Link href="javascript:javascript:history.go(-1)">
                <ChevronLeftIcon w={8} h={8} />
            </Link>
            <Heading color={"black"}>{name}</Heading>
        </Flex>
    )
}

export default ShopDeatailName
