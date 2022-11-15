import { Avatar, Box, Center, Flex, Heading, Stack } from "@chakra-ui/react"
import React, { FC } from "react"
import DetailBox from "../../components/shopreview/DetailBox"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"

const LocationShop: FC<{
    location: String
    phoneNumber: String
}> = ({ location, phoneNumber }) => {
    return (
        <Flex direction={"row"} justifyContent={"space-around"} mt={4}>
            <Center width={"50%"} height={"120px"} bg="white" rounded={"2xl"} mx="2" shadow={"md"}>
                <Heading textAlign={"center"} size={"sm"}>
                    {location}
                </Heading>

                {/* ดีงข้อมูลมาจาก database */}
            </Center>

            <Center width={"50%"} height={"120px"} bg="white" rounded={"2xl"} mx="2" shadow={"md"}>
                <Heading textAlign={"center"} size={"sm"}>
                    {phoneNumber}
                </Heading>

                {/* ดีงข้อมูลมาจาก database */}
            </Center>
            {/* ดีงข้อมูลมาจาก database */}
        </Flex>
    )
}

export default LocationShop
