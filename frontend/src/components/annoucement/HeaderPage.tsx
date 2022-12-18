import { Flex, Spacer, Heading, Box, Text, Show } from "@chakra-ui/react"
import React, { FC } from "react"
import { IconType } from "react-icons"
import { GrClose } from "react-icons/gr"
import { Link } from "react-router-dom"

const HeaderPage: FC<{
    head: string
}> = ({ head }) => {
    return (
        <>
            <Show below="lg">
                <Text as={"b"} fontSize="xl">
                    <GrClose />
                </Text>
            </Show>
            <Spacer />
            <Heading>{head}</Heading>
            <Spacer />
        </>
    )
}

export default HeaderPage
